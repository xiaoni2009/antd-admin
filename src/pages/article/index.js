import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { history } from 'umi'
import { connect } from 'umi'
import { Row, Col, Button, Popconfirm } from 'antd'
import { t } from "@lingui/macro"
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'

@connect(({ user, loading }) => ({ user, loading }))
class Article extends PureComponent {
  handleRefresh = newQuery => {
    const { location } = this.props
    const { query, pathname } = location

    history.push({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery,
        },
        { arrayFormat: 'repeat' }
      ),
    })
  }

  get listProps() {
    const { dispatch, user, loading } = this.props
    const { list, pagination, selectedRowKeys } = user

    return {
      dataSource: list,
      loading: loading.effects['user/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
    }
  }

  get filterProps() {
    const { location, dispatch } = this.props
    const { query } = location

    return {
      filter: {
        ...query,
      },
    }
  }

  render() {
    const { user } = this.props

    return (
      <Page inner>
        <Filter {...this.filterProps} />
        <List {...this.listProps} />
        {/* <Modal {...this.modalProps} /> */}
      </Page>
    )
  }
}

Article.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Article
