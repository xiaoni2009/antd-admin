import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Card } from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import {
  Quote
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

    const quote = {
      name: 'Solon',
      title: 'Ancient Athenian statesman',
      content: "It is never too old to learn.",
      avatar: ""
    }
    const quote1 = {
      name: 'anonymous',
      title: 'proverb',
      content: "Never too old to learn, never too late to turn.",
      avatar: ""
    }
    const quote2 = {
      name: 'anonymous',
      title: 'proverb',
      content: "Nothing in the world is difficult for one who sets his mind to it.",
      avatar: ""
    }
    const quote3 = {
      name: 'anonymous',
      title: 'proverb',
      content: "Don't cry because it is over, smile because it happened.",
      avatar: ""
    }
    const quote4 = {
      name: '王德顺',
      title: '人体艺术师',
      content: "为了这一天，我足足准备了60年。24岁我当话剧演员，44岁开始学英语，49岁创造了造型哑剧，到北京成了一名老北漂，没房没车，一切从头开始。50岁我进的健身房，开始健身。57岁我再次走上了舞台，创造了世界唯一的艺术形式，它叫活雕塑。70岁我开始有意识的练腹肌。79岁我走上了T台。我今年80岁了，还有梦，还有追求。相信我，人的潜能是可以挖掘的，当你说太晚了的时候，你一定要谨慎，它可能是你退却的借口。没有谁能阻止你成功，除了你自己。该炫自己的时候，千万不要对自己手软。",
      avatar: "https://inews.gtimg.com/newsapp_bt/0/12990673080/1000"
    }


    return (
      <Page
        // loading={loading.models.dashboard && sales.length === 0}
        className={styles.home}
      >
        <Row gutter={24}>
          {/* <Card
            bordered={false}
            className={styles.quote}
            bodyStyle={{
              padding: 0,
              height: 204,
              background: Color.peach,
            }}
          >
            <ScrollBar>
              <Quote {...quote} />
            </ScrollBar>
          </Card> */}
          <Card
            bordered={false}
            className={styles.quote}
            bodyStyle={{
              padding: 0,
              height: 204,
              background: Color.purple,
            }}
          >
            <ScrollBar>
              <Quote {...quote1} />
            </ScrollBar>
          </Card>
          <Card
            bordered={false}
            className={styles.quote}
            bodyStyle={{
              padding: 0,
              height: 204,
              background: Color.peach,
            }}
          >
            <ScrollBar>
              <Quote {...quote2} />
            </ScrollBar>
          </Card>
          <Card
            bordered={false}
            className={styles.quote}
            bodyStyle={{
              padding: 0,
              height: 204,
              background: Color.purple,
            }}
          >
            <ScrollBar>
              <Quote {...quote3} />
            </ScrollBar>
          </Card>
          <Card
            bordered={false}
            className={styles.quote}
            bodyStyle={{
              padding: 0,
              height: 204,
              background: Color.peach,
            }}
          >
            <ScrollBar>
              <Quote {...quote4} />
            </ScrollBar>
          </Card>
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
