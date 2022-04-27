import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Tag,
  Space,
  Pagination,
  Popconfirm,
} from 'antd'
import 'moment/locale/zh-cn'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import locale from 'antd/es/date-picker/locale/zh_CN'
import errorImg from '../../assets/error.png'
import './index.scss'
import { getChannels, getTabels, deleteArticle } from '@/api/article'
const { Option } = Select
const { RangePicker } = DatePicker
interface channelInt {
  id: number
  name: string
}
const channelData: channelInt = {
  id: 0,
  name: '',
}
const Article = () => {
  const navigate = useNavigate()
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover: any) => {
        return (
          <img
            src={cover.images[0] || errorImg}
            width={80}
            height={60}
            alt="123"
          />
        )
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data: any) => <Tag color="green">审核通过</Tag>,
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (data: any) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => navigate(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => delArticle(data)}
              okText="确认"
              cancelText="取消">
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]
  // 获取频道列表
  const [channels, setChannels] = useState<Array<channelInt>>([channelData])
  // 文章列表数据管理
  const [article, setArticleList] = useState({
    list: [],
    count: 0,
  })
  // 参数管理
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
  })
  useEffect(() => {
    async function fetchArticleList() {
      const res = await getTabels(params)
      const { results, total_count } = res.data
      setArticleList({
        list: results,
        count: total_count,
      })
    }
    async function fetchChannels() {
      const res = await getChannels()
      setChannels(res.data.channels)
      fetchArticleList()
    }
    fetchChannels()
  }, [params])
  const onSearch = (values: { status: any; channel_id: any; date: any }) => {
    const { status, channel_id, date } = values
    // 格式化表单数据
    const _params = {
      status: 0,
      channel_id: 0,
      begin_pubdate: '',
      end_pubdate: '',
    }
    // 格式化status
    _params.status = status
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    // 修改params参数 触发接口再次发起
    setParams({
      ...params,
      ..._params,
    })
  }
  const pageChange = (page: any, pageSize: any) => {
    // 拿到当前页参数 修改params 引起接口更新
    setParams({
      page: page,
      per_page: pageSize,
    })
  }
  const delArticle = async (data: any) => {
    await deleteArticle(data.id)
    setParams({
      page: params.page,
      per_page: 10,
    })
  }
  return (
    <div>
      <Card style={{ marginBottom: 20 }}>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>内容管理</Breadcrumb.Item>
        </Breadcrumb>
        <Form
          onFinish={onSearch}
          initialValues={{ status: -1, channel_id: '推荐' }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 200 }}>
              {channels.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
        <Table
          pagination={false}
          rowKey="id"
          columns={columns}
          dataSource={article.list}
        />
        <Pagination
          total={article.count}
          onChange={pageChange}
          defaultCurrent={params.page}
        />
      </Card>
    </div>
  )
}

export default Article
