import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Card } from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import {
  NumberCard,
  Quote,
  Sales,
  Weather,
  RecentSales,
  Comments,
  Completed,
  Browser,
  Cpu,
  User,
} from './components'
import styles from './index.less'
import store from 'store'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

@connect(({ app, home, loading }) => ({
  home,
  loading,
}))
class Home extends PureComponent {
  render() {
    const userDetail = store.get('user')
    const { avatar, username } = userDetail
    const { home, loading } = this.props
    console.log(this.props)
    console.log(this.store)
    const {
      weather,
      sales,
      quote,
      numbers,
      recentSales,
      comments,
      completed,
      browser,
      cpu,
      user,
    } = home

    console.log(numbers)
    const numberCards = numbers.map((item, key) => (
      <Col key={key} lg={6} md={12}>
        <NumberCard {...item} />
      </Col>
    ))

    return (
      <Page
        loading={loading.models.home}
        className={styles.home}
      >
        <Row gutter={24}>
          
          <Col lg={6} md={24}>
            <Row gutter={24}>
              <Col lg={24} md={12}>
                
              </Col>
            </Row>
          </Col>
        </Row>
      </Page>
      
    )
  }
}

Home.propTypes = {
  home: PropTypes.object,
  loading: PropTypes.object,
}

export default Home
