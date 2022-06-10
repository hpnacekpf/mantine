import React, { useEffect, useState } from 'react';

// Library
import Joi from 'joi';
import { useForm, joiResolver } from '@mantine/form';
import { TextInput, Button, Box, Group, Grid, Select, Text, Card, Image, ScrollArea, SegmentedControl, Title, NumberInput, Input } from '@mantine/core';
import ImageUploading, { ImageListType } from "react-images-uploading";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Contants
import { apiUrl } from '../../constants'

// Components
import { PageHeader } from '../../components/PageHeader';
import CreateCategory from './CreateCategory';
import { Check } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
// import SwitchTime from './switchTime';

export const schema = Joi.object({
  name: Joi.string().min(2).message('Name should have at least 2 letters'),
  categoryId: Joi.string().alphanum().message('Invalid categoryId'),
  video: Joi.string().domain().message('Invalid video'),
  switchTimeSchema: Joi.boolean(),
  switchJobSchema: Joi.boolean(),
  switchUnitSchema: Joi.boolean(),
  standardRate: Joi.alternatives().conditional('switchTimeSchema', { is: true, then: Joi.number().greater(0).message('Invalid Standard rate'), otherwise: Joi.any() }),
  durationTime: Joi.alternatives().conditional('switchTimeSchema', { is: true, then: Joi.string().alphanum().message('Invalid duration'), otherwise: Joi.any() }),
  costJob: Joi.alternatives().conditional('switchJobSchema', { is: true, then: Joi.number().greater(0).message('Invalid cost job'), otherwise: Joi.any() }),
  amount: Joi.alternatives().conditional('switchJobSchema', { is: true, then: Joi.number().greater(0).message('Invalid amount'), otherwise: Joi.any() }),
  durationJob: Joi.alternatives().conditional('switchJobSchema', { is: true, then: Joi.string().alphanum().message('Invalid duration'), otherwise: Joi.any() }),
  money: Joi.string(),
  unit: Joi.alternatives().conditional('switchUnitSchema', { is: true, then: Joi.number().greater(0).message('Invalid unit'), otherwise: Joi.any() }),
  defaultValueUnit: Joi.alternatives().conditional('switchUnitSchema', { is: true, then: Joi.number().greater(0).message('Invalid default value unit'), otherwise: Joi.any() }),
  unitLabel: Joi.alternatives().conditional('switchUnitSchema', { is: true, then: Joi.string().alphanum().message('Invalid unit label'), otherwise: Joi.any() }),
})

const CreateServices = () => {
  const [images, setImages] = useState([])
  const [dataCategory, setDataCategory] = useState([])
  const maxNumber = 69;
  let navigate = useNavigate();
  const [opened, setOpened] = useState(false)
  const [switchTime, setSwitchTime] = useState(true)
  const [switchJob, setSwitchJob] = useState(false)
  const [switchUnit, setSwitchUnit] = useState(false)

  useEffect(() => {
    axios({
      method: 'get',
      url: `${apiUrl}/category`,
      responseType: 'stream'
    })
      .then(function (response) {
        setDataCategory(response.data)
      });
  }, [opened])

  const postData = async (dataS: any) => {
    console.log({ ...dataS, images });

    await axios.post(`${apiUrl}/service`, {
      ...dataS, images
    })
      .then(function (response) {
        showNotification({
          title: 'Add Service successful',
          message: 'Add Service successful 🤥',
          icon: <Check size={18} />,
        })
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    navigate('/services')
  }

  const onChangeImage = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  const form = useForm({
    schema: joiResolver(schema),
    initialValues: {
      name: null,
      categoryId: null,
      video: null,
      standardRate: null,
      money: 'VNĐ',
      durationTime: null,
      durationJob: null,
      costJob: null,
      amount: null,
      unit: null,
      defaultValueUnit: null,
      unitLabel: null,
      switchTimeSchema: switchTime,
      switchJobSchema: switchJob,
      switchUnitSchema: switchUnit,
    },
  });

  const newData: { label: string; value: string; }[] = []

  const convertData = () => {
    dataCategory.map((item: any) => {
      newData.push({ label: item.name, value: item.id })
      return null
    })
  }
  convertData()

  const durationDataTime = [
    { value: "1", label: "15 Minutes" },
    { value: "2", label: "30 Minutes" },
    { value: "3", label: "Hourly" },
    { value: "4", label: "Daily" },
    { value: "5", label: "Weekly" },
    { value: "6", label: "Fortnightly" },
    { value: "7", label: "Monthly" },
  ]

  const durationDataJob = [
    { value: "1", label: "Minute(s)" },
    { value: "2", label: "Hour(s)" },
    { value: "3", label: "Day(s)" },
    { value: "4", label: "Week(s)" },
    { value: "5", label: "Fortnight(s)" },
    { value: "6", label: "Month(s)" },
  ]

  const handleChange = (value: string) => {

    if (value === "time") {
      setSwitchTime(true)
      setSwitchJob(false)
      setSwitchUnit(false)
    }
    if (value === "job") {
      setSwitchTime(false)
      setSwitchJob(true)
      setSwitchUnit(false)
    }
    if (value === "unit") {
      setSwitchTime(false)
      setSwitchJob(false)
      setSwitchUnit(true)
    }
  }

  useEffect(() => {
    form.setValues({
      ...form.values,
      switchTimeSchema: switchTime,
      switchJobSchema: switchJob,
      switchUnitSchema: switchUnit,
    })
  }, [switchTime, switchJob, switchUnit])

  return (
    <>
      {opened && <CreateCategory open={opened} setOpened={setOpened} />}
      <PageHeader
        title="Create Service"
        actions={[<Button size="xs">Test 1</Button>]}
      />
      <Box sx={{ maxWidth: "80%" }} mx="auto">
        <form onSubmit={form.onSubmit(async (values: any) => {
          console.log(values);

          const dataS = {
            categoryId: values.categoryId,
            name: values.name,
            video: values.video,
            pricing: {
              time: {
                standardRate: values.standardRate,
                durationTime: values.durationTime,
              },
              job: {
                costJob: values.costJob,
                durationJob: values.durationJob,
                amount: values.amount,
              },
              unit: {
                unit: values.unit,
                unitLabel: values.unitLabel,
                defaultValueUnit: values.defaultValueUnit,
              },
            }
          };
          postData(dataS)
        })}>
          <Grid columns={24}>
            <Grid.Col span={12}>
              <TextInput
                // required
                label="Service Name"
                placeholder="Enter service name..."
                // size="xs"
                mt="sm"
                {...form.getInputProps('name')}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Grid columns={24}>
                <Grid.Col span={19}>
                  <Select
                    // required
                    label="Category ID"
                    placeholder="Pick one"
                    mt="sm"
                    searchable
                    data={newData}
                    defaultValue="1"
                    clearable 
                    {...form.getInputProps('categoryId')}
                  />
                </Grid.Col>
                <Grid.Col span={5} style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: "flex-end" }}>
                  <Button variant="outline" onClick={() => setOpened(true)}>
                    Add
                  </Button>
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col span={24}>
              <Text size="md" weight={500} color="#212529" style={{ marginBottom: "4px" }}>Service Image</Text>
              <ImageUploading
                multiple
                value={images}
                onChange={onChangeImage}
                maxNumber={maxNumber}
              // {...form.getInputProps('images')}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    <Button
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop here
                    </Button>
                    &nbsp;
                    <Button onClick={onImageRemoveAll} >Remove all images</Button>
                    <ScrollArea style={{ width: "100%" }}>
                      <div style={{ width: "100%" }}>
                        <div style={{ display: "flex" }}>
                          {imageList.map((image, index) => (
                            <div style={{ width: "200px" }}>
                              <Card shadow="xl" p="lg" style={{ margin: "5px 10px" }}>
                                <Card.Section component="a" target="_blank" style={{ padding: "5px" }}>
                                  <Image
                                    src={image.dataURL}
                                    height={160}
                                    radius="sm"
                                    // style={{ width: "30%"}}
                                    alt="Norway"
                                    onClick={() => onImageUpdate(index)}
                                  />
                                  <Button fullWidth color="gray" style={{ margin: "5px 0 10px" }} onClick={() => onImageRemove(index)}>Remove</Button>
                                </Card.Section>
                              </Card>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </ImageUploading>
            </Grid.Col>
            <Grid.Col span={24}>
              <TextInput
                // required
                label="Service Video"
                placeholder="Enter URL Video..."
                // size="xs"
                mt="sm"
                {...form.getInputProps('video')}
              />
            </Grid.Col>
            <Grid.Col span={24}>
              <Text size="md" weight={500} color="#212529" style={{ marginBottom: "4px" }} >How do you charge for your service?</Text>
              <SegmentedControl
                onChange={(value) => handleChange(value)}
                color="blue"
                data={[
                  { label: 'Charge by time', value: 'time' },
                  { label: 'Charge by job', value: 'job' },
                  { label: 'Charge by unit', value: 'unit' },
                ]}
              />
              <div>
                {switchTime &&
                  <Grid columns={24}>
                    <Grid.Col span={12}>
                      <NumberInput
                        label="Standard rate"
                        precision={2}
                        // onChange={(value: string) => setValueStandardRate(value)}
                        placeholder="0.00"
                        mt="sm"
                        {...form.getInputProps('standardRate')}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <TextInput
                        // mt="sm"
                        style={{ marginTop: "16px" }}
                        label="  "
                        disabled={true}
                        {...form.getInputProps('money')}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Select
                        label="Duration"
                        placeholder="Pick one"
                        mt="sm"
                        searchable
                        clearable 
                        data={durationDataTime}
                        defaultValue="1"
                        {...form.getInputProps('durationTime')}
                      />
                    </Grid.Col>
                  </Grid>
                }
                {switchJob && <>
                  <Grid columns={24}>
                    <Grid.Col span={12}>
                      <NumberInput
                        label="What is the starting cost of this service?"
                        placeholder="0"
                        mt="sm"
                        {...form.getInputProps('costJob')}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <TextInput
                        // mt="sm"
                        style={{ marginTop: "16px" }}
                        label="  "
                        disabled={true}
                        {...form.getInputProps('money')}
                      />
                    </Grid.Col>
                    <Grid.Col span={24} style={{ margin: "0" }}>
                      <Text size="md" weight={500} color="#212529" style={{ marginBottom: "4px" }} >How much time does it take on average to complete this standard service?</Text>
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <NumberInput
                        label="Amount"
                        placeholder="0"
                        {...form.getInputProps('amount')}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Select
                        label="Duration"
                        placeholder="Pick one"
                        // mt="sm"
                        searchable
                        clearable 
                        data={durationDataJob}
                        defaultValue="1"
                        {...form.getInputProps('durationJob')}
                      />
                    </Grid.Col>
                  </Grid>
                </>}
                {switchUnit && <>
                  <Grid columns={24}>
                    <Grid.Col span={12}>
                      <NumberInput
                        label="Unit"
                        placeholder="e.g. m2, litre, room etc"
                        mt="sm"
                        {...form.getInputProps('unit')}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <TextInput
                        mt="sm"
                        label="Unit label"
                        placeholder="e.g. Enter size in m2"
                        {...form.getInputProps('unitLabel')}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <NumberInput
                        label="Default Value"
                        placeholder="0.00"
                        precision={2}
                        mt="sm"
                        {...form.getInputProps('defaultValueUnit')}
                      />
                    </Grid.Col>
                  </Grid>
                </>}
              </div>
            </Grid.Col>
          </Grid>
          <Group position="right" mt="xl">
            <Button type="submit" onClick={() => console.log('1')}>
              Create
            </Button>
          </Group>
        </form>
      </Box>
    </>
  );
};

export default CreateServices;