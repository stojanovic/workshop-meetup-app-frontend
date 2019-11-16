import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Alert,
  Button,
  DatePicker,
  Upload,
  TimePicker,
} from 'antd';
import { Storage } from 'aws-amplify';

import moment from 'moment';

function NewEventForm(props) {
  const [formError, setFormError] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const handleUpload = async () => {
    const response = await Storage.put(fileToUpload.name, fileToUpload);
    const s3ImageUrl = await Storage.get(response.key, { level: 'public' });
    setImageUrl(s3ImageUrl);
    setUploading(false);
    return s3ImageUrl;
  }

  useEffect(() => {
    if (fileToUpload) {
      handleUpload(fileToUpload);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileToUpload]);

  const handleUploadChange = () => {
    setUploading(true);
  }

  const uploadButton = (
    <div>
      <Icon type={uploading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Form {...formItemLayout} onSubmit={(e) => {
      e.preventDefault();
      props.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          console.log('VALUES:', {
            name: values.name,
            description: values.description,
            date: values.date.format('YYYY-MM-DD'),
            eventImage: imageUrl,
          });
          // await createNewEvent(values.name, values.description)
        } else {
          const errorMsg = []
          Object.keys(err)
            .forEach((key) => {
              err[key].errors.forEach(e => errorMsg.push(e.message))
            })
          setFormError(`Error: ${errorMsg.join(', ')}`)
        }
      });
    } }>
      {
        formError ? <Alert type="error" message={formError} banner /> : ''
      }
      <Form.Item
        label={
          <span>
            Event name&nbsp;
              <Tooltip title="What's the name of your new event">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please input your event name.', whitespace: true }],
        })(<Input />)}
      </Form.Item>

      <Form.Item
        label={
          <span>
            Description&nbsp;
              <Tooltip title="Describe your event">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator('description', {
          rules: [{
            required: true,
            message: 'Please describe your event.',
            whitespace: true
          }, {
            type: 'string',
            message: 'Description too long.',
            max: 2000
          }],
        })(<Input.TextArea allowClear />)}
      </Form.Item>

      <Form.Item
        label={
          <span>
            Date&nbsp;
              <Tooltip title="Date of your event">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator('date', {
          rules: [{
            required: true,
            message: 'Please select the date of your event.'
          }],
        })(<DatePicker onChange={(date, dateString) => console.log('DATE', date, dateString)} />)}
      </Form.Item>

      <Form.Item
        label={
          <span>
            Start time&nbsp;
              <Tooltip title="Select start time of your event">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        <TimePicker minuteStep={15} defaultValue={moment('18:00', 'HH:mm')} format={'HH:mm'} />
      </Form.Item>

      <Form.Item
        label={
          <span>
            End time&nbsp;
              <Tooltip title="Select end time of your event">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        <TimePicker minuteStep={15} defaultValue={moment('20:00', 'HH:mm')} format={'HH:mm'} />
      </Form.Item>

      <Form.Item
        label={
          <span>
            Event image&nbsp;
              <Tooltip title="Upload an image for your event">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        <Upload
          name="event-image"
          listType="picture-card"
          className="event-image-uploader"
          showUploadList={false}
          action={handleUpload}
          beforeUpload={file => {
            setFileToUpload(file);
            return false;
          }}
          onChange={handleUploadChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>

    </Form>
  );
}

const WrappedNewEventForm = Form.create({ name: 'new-event' })(NewEventForm);

export default WrappedNewEventForm;
