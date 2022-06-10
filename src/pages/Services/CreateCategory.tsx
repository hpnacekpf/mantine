// Library
import { Box, Button, Group, Modal, TextInput } from '@mantine/core';
import Joi from 'joi';
import { useForm, joiResolver } from '@mantine/form';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

// Constants
import { apiUrl } from '../../constants';
import { useEffect, useState } from 'react';
import { Check } from 'tabler-icons-react';

const schema = Joi.object({
  name: Joi.string().min(2).trim().message('Category name should have at least 2 letters'),
  nameUpdate: Joi.string().min(2).trim().message('Category name should have at least 2 letters'),
});

const CreateCategory = ({ open, setOpened, dataUpdate }: any): JSX.Element => {
  const [data, setData] = useState("")

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      name: '',
      nameUpdate: '',
    },
  });

  console.log(dataUpdate.name);


  useEffect(() => {
    if (dataUpdate) {
      console.log(2);
      setData(dataUpdate.name)
    } else {
      setData("")
    }
  }, [open])

  const createCategory = async (values: any) => {
    console.log(values);

    await axios.post(`${apiUrl}/category`, {
      ...values
    })
      .then(function (response) {
        showNotification({
          title: 'Add Category successful',
          message: 'Add Category successful 🤥',
          icon: <Check size={18} />,
        })
        console.log(response);
        // setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpened(false)
  }

  console.log(data);
  console.log(dataUpdate);

  const handleUpdate = async (data: any) => {
    console.log(data);

    await axios.put(`${apiUrl}/category/${dataUpdate.id}`, {
      name: data
    })
      .then(function (response) {
        showNotification({
          title: 'Update Category successful',
          message: 'Update Category successful 🤥',
          icon: <Check size={18} />,
        })
        console.log(response);
        setData("")
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpened(false)
  }

  const handleClose = () => {
    console.log(1);

    setOpened(false)
    setData("")
  }

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <Modal
        opened={open}
        onClose={() => handleClose()}
      >
        <form onSubmit={form.onSubmit((values) =>
          createCategory(values)
        )}>
          {data ?
            <TextInput
              placeholder="Category name"
              label="Category name 1"
              {...form.getInputProps('nameUpdate')}
              value={data}
              onChange={(event: any) => setData(event.currentTarget.value)}
            /> :
            <TextInput
              placeholder="Category name"
              label="Category name 2"
              {...form.getInputProps('name')}
            // value={data}
            />
          }
          <Group position="right" mt="xs">
            {data ? <Button onClick={() => handleUpdate(data)} size="xs" mt="xs" mr="xs">Save</Button> : <Button type="submit" size="xs" mt="xs" mr="xs">Create</Button>}
            <Button onClick={() => setOpened(false)} size="xs" mt="xs">Cancel</Button>
          </Group>
        </form>
      </Modal>
    </Box>
  );
};

export default CreateCategory;