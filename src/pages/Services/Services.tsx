import React, { useState, useEffect } from 'react';

// Components
import { PageHeader } from "../../components/PageHeader";

// Libra
import { Button, Card, Checkbox, Loader } from "@mantine/core";
import { createStyles, Table, Text, Group, ScrollArea } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useModals } from '@mantine/modals';

// Api
import { apiUrl } from "../../constants"
import LoaderComponents from './LoaderComponents';
import { showNotification } from '@mantine/notifications';
import { Check } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

interface DataService {
  // services: {
  id: number;
  name: string;
  categoryId: number;
  image: string;
  video: string;
  pricing: {
    changeTypeId: [
      { idType: number, name: string },
    ],
    quantity: number,
    price: number,
    UnitMeasureId: [
      { idUnitMeasure: number, name: string },
    ],
  },
  // };
}

// interface Data {
//   sort: [string],
//   takes: number,
//   skip: number,
//   filters: {
//     fieldName: string,
//     type: string,
//     value: string,
//   },
//   view: [string],
//   services: DataService
// }

export const Services = () => {
  const { classes, cx } = useStyles();
  const [data, setData] = useState([])
  const [dataCategory, setDataCategory] = useState([])
  const [selection, setSelection] = useState(['1']);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    axios({
      method: 'get',
      url: `${apiUrl}/service`,
      responseType: 'stream'
    })
      .then(function (response) {
        setData(response.data)
        setLoading(false)
      });

    axios({
      method: 'get',
      url: `${apiUrl}/category`,
      responseType: 'stream'
    })
      .then(function (response) {
        setDataCategory(response.data)
        setLoading(false)
      });

  }, [])

  const modals = useModals();

  const openConfirmModal = (item: DataService) => modals.openConfirmModal({
    title: `Are you sure you want to delete ${item.name} service?`,
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => handleDelete(item.id)
  });

  const handleDelete = async (id: number) => {
    setLoading(true);
    await axios.delete(`${apiUrl}/service/${id}`)
    showNotification({
      title: 'Delete Category successful',
      message: 'Delete Category successful 🤥',
      icon: <Check size={18} />,
    })
    axios({
      method: 'get',
      url: `${apiUrl}/service`,
      responseType: 'stream'
    })
      .then(function (response) {
        setData(response.data)
        setLoading(false);
      });

  }

  // const toggleRow = (id: string) =>
  //   setSelection((current) =>
  //     current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
  //   );
  // const toggleAll = () =>
  //   setSelection((current) => (current.length === data.length ? [] : data.map((item: any) => item.id)));

  const rows = data.map((item: DataService,) => {
    const selected = selection.includes(`${item.id}`);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        {/* <td>
          <Checkbox
            checked={selection.includes(`${item.id}`)}
            onChange={() => toggleRow(`${item.id}`)}
            transitionDuration={0}
          />
        </td> */}
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {item.id}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {dataCategory.map((itemCategory: any) => {
                return (
                  <>
                    {itemCategory.id === item.categoryId ? itemCategory.name : null}
                  </>
                )
              })}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Link to={`update/${item.id}`}>
              <Button>
                Update
              </Button>
            </Link>
            <Button onClick={() => openConfirmModal(item)}>
              Delete
            </Button>
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <>
      <PageHeader
        title="Services"
        actions={[<Button size="xs">Test 1</Button>]}
      />
      <Button style={{marginRight: "10px"}} onClick={() => navigate("categories")}>Loại dịch vụ</Button>
      <Link to="/services/add">
        <Button style={{ marginBottom: "10px" }}>
          Thêm dịch vụ
        </Button>
      </Link>
      {
        loading ?
          <LoaderComponents /> :
          <Card shadow="sm" p="sm">
            <ScrollArea>
              <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
                <thead>
                  <tr>
                    {/* <th style={{ width: 40 }}>
                  <Checkbox
                    onChange={toggleAll}
                    checked={selection.length === data.length}
                    indeterminate={selection.length > 0 && selection.length !== data.length}
                    transitionDuration={0}
                  />
                </th> */}
                    <th>ID</th>
                    <th>Tên dịch vụ</th>
                    <th>Loại dịch vụ</th>
                    <th>Tùy chọn</th>
                  </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody>
              </Table>
            </ScrollArea>
          </Card>
      }
      {/* <Pagination total={data.length} siblings={1} mt="xs" initialPage={5}/> */}
    </>
  );
};