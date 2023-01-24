import { Card, Col, Form, Input, Row, Button } from "antd";
import React from "react";
import { InfoToastify } from "../../Helpers/ToastifyMessage";
import { PostIssue } from "../../services/IssueServices";

const CreateIssueForm = () => {
  const [form] = Form.useForm();

  const onFinish = (value) => {
    console.log("submit button success: ", value);

    PostIssue(value).then(
      (res) => {
        InfoToastify("Your request has been accepted!");
      },
      (err) => {
        console.log("Error: ", err);
      }
    );

    //InfoToastify("Your request has been accepted!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Submit button failed: ", errorInfo);
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  return (
    <div>
      <h4>Create Issue</h4>
      <Row style={{ marginLeft: "20px" }}>
        <Col span={20} style={{ marginTop: 16 }}>
          <Card type="inner" title="Issue">
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 15,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Issue Code"
                name="Code"
                rules={[
                  {
                    required: true,
                    message: "Please enter issue code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Issue Title"
                name="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter issue title!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Issue Description"
                name="Description"
                rules={[
                  {
                    required: false,
                    message: "Please enter issue Description!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateIssueForm;
