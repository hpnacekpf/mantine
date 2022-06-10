// Library
import { Button, Card, createStyles, Group, ScrollArea, Table, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Components
import { PageHeader } from '../../components/PageHeader';
import LoaderComponents from './LoaderComponents';
// Constants
import { apiUrl } from '../../constants'
import { useModals } from '@mantine/modals';
import CreateCategory from './CreateCategory';
import { Check, X } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

const Categories = () => {
  const { classes, cx } = useStyles();
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [selection, setSelection] = useState(['1']);
  const [opened, setOpened] = useState(false)
  const [dataServices, setDataServices] = useState([])
  const [dataUpdate, setDataUpdate] = useState('')

  useEffect(() => {
    setLoading(true)
    axios({
      method: 'get',
      url: `${apiUrl}/category`,
      responseType: 'stream'
    })
      .then(function (response) {
        setData(response.data)
        setLoading(false)
      });
    axios({
      method: 'get',
      url: `${apiUrl}/service`,
      responseType: 'stream'
    })
      .then(function (response) {
        setDataServices(response.data)
        setLoading(false)
      });

  }, [opened])

  const handleUpdate = (item: any) => {
    setOpened(true)
    setDataUpdate(item)
  }

  const rows = data.map((item: any) => {
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
              {
                dataServices.map((itemServices: any) => {
                  return (
                    <div>
                      {itemServices.categoryId === item.id ? itemServices.name : null}
                    </div>
                  )
                })
              }
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            {/* <Link to={`update/${item.id}`}> */}
            <Button onClick={() => handleUpdate(item)}>
              Update
            </Button>
            {/* </Link> */}
            <Button onClick={() => openConfirmModal(item)}>
              Delete
            </Button>
          </Group>
        </td>
      </tr>
    );
  });

  const modals = useModals();

  const openConfirmModal = (item: any) => modals.openConfirmModal({
    title: `Are you sure you want to delete ${item.name} category?`,
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => {
      showNotification({
        title: 'Cancel Delete Category',
        message: 'Cancel Delete Category 🤥',
        icon: <X size={18} />,
        color: "red"
      })
      return null
    },
    onConfirm: () => handleDelete(item.id)
  });

  const handleDelete = async (id: number) => {
    setLoading(true);
    await axios.delete(`${apiUrl}/category/${id}`)
    showNotification({
      title: 'Delete Category successful',
      message: 'Delete Category successful 🤥',
      icon: <Check size={18} />,
    })
    await axios({
      method: 'get',
      url: `${apiUrl}/category`,
      responseType: 'stream'
    })
      .then(function (response) {
        setData(response.data)
        setLoading(false);
      });

  }

  return (
    <>
      {opened && <CreateCategory open={opened} setOpened={setOpened} dataUpdate={dataUpdate}/>}
      <PageHeader
        title="Services Categories"
        actions={[<Button size="xs">Test 1</Button>]}
      />
      {/* <Link to="/services/add"> */}
      <Button style={{ marginBottom: "10px" }} onClick={() => setOpened(true)}>
        Add Category
      </Button>
      {/* </Link> */}
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
                    <th>Name</th>
                    <th>Services List</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody>
              </Table>
            </ScrollArea>
          </Card>
      }
    </>
  );
};

export default Categories;