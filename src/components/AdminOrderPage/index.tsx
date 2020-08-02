import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { history } from '../../store';
import AdminOrderList from '../AdminOrderList';

import './style.less';

interface AdminOrderPageProps {
  orders: {
    uuid: string;
    orderedAt: Date;
    items: {
      uuid: string;
      itemName: string;
      quantity: number;
      fulfilled: boolean;
      price: number;
      description: string;
      notes: string;
    }[];
  }[];
  setNote: Function;
  setFulfill: Function;
  noteVisible: boolean;
  setNoteVisible: Function;
  scratchNote: string;
  setScratchNote: Function;
}

const { Search } = Input;

const AdminOrderPage: React.FC<AdminOrderPageProps> = (props) => {
  const {
    orders,
    setNote,
    setFulfill,
    noteVisible,
    setNoteVisible,
    scratchNote,
    setScratchNote,
  } = props;

  return (
    <div className="admin-orders">
      <Modal
        title="Notes"
        visible={noteVisible}
        okText="Submit"
        onOk={() => {
          setNote(scratchNote);
          setNoteVisible(false);
          setScratchNote('');
        }}
        onCancel={() => setNoteVisible(false)}
      >
        <form>
          <Form.Item className="note">
            <Input.TextArea
              name="note"
              value={scratchNote}
              onChange={(event) => setScratchNote(event.target.value)}
              rows={4}
            />
          </Form.Item>
        </form>
      </Modal>
      <div className="store-header">
        <h2 className="title">Orders</h2>
        <Button
          className="admin-redirect-button"
          onClick={() => {
            history.push('/store');
          }}
        >
          <b>Store</b>
        </Button>
      </div>
      <div className="search-section">
        <Search
          placeholder="Search..."
          size="large"
          // We'll include this console statement for now.
          // We need a placeholder for the search functionality.
          // eslint-disable-next-line no-console
          onSearch={(value) => console.log(`Search not implemented! Here's value anyway: ${value}`)}
        />
        <div className="button-array">
          <Button
            // For this button, we need to remove margin on the left, hence the wonky "first-button class"
            className="tag-button first-button"
            type="primary"
            ghost
            shape="round"
          >
            Completed
          </Button>
          <Button className="tag-button" type="danger" ghost shape="round">
            Cancelled
          </Button>
        </div>
      </div>
      <AdminOrderList orders={orders} triggerModal={setNoteVisible} setFulfill={setFulfill} />
    </div>
  );
};

export default AdminOrderPage;
