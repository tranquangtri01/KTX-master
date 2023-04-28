import React, { Component } from "react";
import { Table, Button } from "antd";

const { Column } = Table;

export class Billing extends Component {
  state = {
    selectedRowKeys: ["card-vn"], // Check here to configure the default column
    creditCards: [
      {
        key: "card-vn",
        cardType: "VNPAY",
        cardTypeImg: "/img/others/vnpay.png",
        cardNumber: "•••• •••• •••• 7260",
        exp: "06/22",
      },
      {
        key: "card-mm",
        cardType: "Momo",
        cardTypeImg: "/img/others/momo.png",
        cardNumber: "•••• •••• •••• 7260",
        exp: "06/22",
      },
    ],
    modalVisible: false,
    newCreditCardInfo: {
      cardHolderName: "",
      cardNumber: "",
      exp: "06/22",
    },
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys });
  };

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { selectedRowKeys, creditCards } = this.state;
    const rowSelection = {
      selectedRowKeys,
      type: "radio",
      onChange: this.onSelectChange,
    };

    const locale = {
      emptyText: (
        <div className="text-center my-4">
          <img
            src="/img/others/img-7.png"
            alt="Add credit card"
            style={{ maxWidth: "90px" }}
          />
          <h3 className="mt-3 font-weight-light">Please add a credit card!</h3>
        </div>
      ),
    };

    return (
      <>
        <h2 className="mb-4">Phương thức thanh toán</h2>
        <Table
          locale={locale}
          dataSource={creditCards}
          rowSelection={rowSelection}
          pagination={false}
        >
          <Column
            title="Loại thanh toán"
            key="cardType"
            render={(text, record) => (
              <div className="img-logo-bill">
                <img src={record.cardTypeImg} alt={record.cardType} />
                <span className="ml-2">{record.cardType}</span>
              </div>
            )}
          />
          <Column title="Mã config" dataIndex="cardNumber" key="cardNumber" />
          <Column title="Hạn" dataIndex="exp" key="exp" />
         
        </Table>
        <div className="mt-3 text-right">
          <Button type="primary">Lưu</Button>
        </div>
      </>
    );
  }
}

export default Billing;
