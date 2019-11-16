import React, { useState } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Alert,
  Button
} from 'antd';

function NewMeetupForm(props) {
  const [formError, setFormError] = useState(0);
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

  return (
    <Form {...formItemLayout} onSubmit={(e) => {
      e.preventDefault();
      props.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          // TODO: create new meetup with params: values.name, values.description
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
            Group name&nbsp;
              <Tooltip title="What's the name of the meetup group you are creating">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please input your group name.', whitespace: true }],
        })(<Input />)}
      </Form.Item>

      <Form.Item
        label={
          <span>
            Short description&nbsp;
              <Tooltip title="Describe your meetup group in 200 characters">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator('description', {
          rules: [{
            required: true,
            message: 'Please describe your meetup group.',
            whitespace: true
          }, {
            type: 'string',
            message: 'Description too long.',
            max: 200
          }],
        })(<Input.TextArea allowClear />)}
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>

    </Form>
  );
}

const WrappedNewMeetupForm = Form.create({ name: 'new-meetup' })(NewMeetupForm);

export default WrappedNewMeetupForm;
