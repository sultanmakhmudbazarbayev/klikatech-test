import React, { useRef, useState } from 'react';
import { Col, Row, Table, Typography } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useQuery } from 'react-query';
import musicAPI from './api/music/musicAPI';
import { Music } from './types/music';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

type DataIndex = keyof Music;

export const App: React.FC = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    sortField: undefined,
    sortOrder: undefined,
    filters: {},
  });

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Music> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const { data: genres } = useQuery([], () =>
    musicAPI.getGenres().then((res) => res.data)
  );

  const columns: ColumnsType<Music> = [
    {
      title: 'song',
      dataIndex: 'song',
      ...getColumnSearchProps('song'),
    },
    {
      title: 'year',
      dataIndex: 'year',
      ...getColumnSearchProps('year'),
    },
    {
      title: 'artist',
      dataIndex: 'artist.artist_name',
      ...getColumnSearchProps('artist.artist_name'),
    },
    {
      title: 'genre',
      dataIndex: 'genre.genre',
      filterMultiple: false,
      filters:
        genres?.map((genre) => ({ text: genre.genre, value: genre.id })) || [],
    },
  ];

  const { data, isLoading } = useQuery([tableParams, searchText], () =>
    musicAPI
      .getMusic({
        pagination: {
          offset: tableParams.pagination?.current! - 1,
          limit: tableParams.pagination?.pageSize,
        },
        filter: {
          song_name: searchedColumn === 'song_name' ? searchText : undefined,
          artist_name:
            searchedColumn === 'artist.artist_name' ? searchText : undefined,
          year: searchedColumn === 'year' ? searchText : undefined,
          genre_id:
            (tableParams.filters?.['genre.genre'][0] as string) || undefined,
        },
      })
      .then((res) => {
        return res.data;
      })
  );

  const onChange = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: any
  ) => {
    console.log(filters);
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <Row style={{ padding: '48px' }}>
      <Col span={24}>
        <Typography.Title>Music</Typography.Title>
        <Table
          rowKey={(record) => record.id}
          loading={isLoading}
          columns={columns}
          dataSource={data?.data}
          onChange={onChange}
          pagination={{ ...tableParams.pagination, total: data?.count }}
        />
      </Col>
    </Row>
  );
};
