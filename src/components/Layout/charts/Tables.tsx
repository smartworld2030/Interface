import React from "react";
import Table from "antd/lib/table";

interface columns {
  title: JSX.Element;
  dataIndex: string;
  key: string;
}
interface TableProps {
  columns: columns[];
  data: any[];
  maxWidth?: number;
}

export const Tables: React.FC<TableProps> = ({ columns, data, maxWidth }) => {
  return (
    <Table
      style={{ maxWidth }}
      columns={columns}
      dataSource={data}
      scroll={{ y: 225 }}
      pagination={{ pageSize: 50, hideOnSinglePage: true }}
    />
  );
};
