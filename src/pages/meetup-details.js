import React, { useState, useEffect } from 'react';
import { Typography, Button, Row, Col, Card, Icon, Divider, Skeleton, Empty } from 'antd';
import { Link, useParams, useHistory } from 'react-router-dom';

async function getMeetupDetailsFromApi(id, setMeetupDetails) {
  const meetup = {
    _id: '1',
    name: 'JS Belgrade',
    description: 'JS Belgrade is JavaScript User Group from Belgrade. Our goal is to connect Belgrade\'s JavaScript community through monthly meetups.',
    events: [{
      _id: 'e1',
      name: 'Meetup #35 - TDD and WASM',
      date: 'Nov 29, 2019',
      image: 'https://secure.meetupstatic.com/photos/event/4/9/8/3/highres_485778819.jpeg' 
    }]
  };
  setMeetupDetails(meetup)
}

function Loading() {
  return (
    <div>
      <Row>
        <Col span={12}>
          <Skeleton paragraph={false} active={true} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Skeleton paragraph={false} active={true} />
        </Col>
      </Row>
      <Row gutter={[30, 0]}>
        <Col span={24}>
          <Divider>Events</Divider>
        </Col>
        <Col span={8}>
          <Card>
            <Skeleton avatar active />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Skeleton avatar active />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Skeleton avatar active />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

function MeetupDetails() {
  const [ meetupDetails, setMeetupDetails ] = useState(null);
  const [showLoading, setShowLoading ] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getMeetupDetailsFromApi(id, setMeetupDetails);
    setShowLoading(false);
  }, [id]);

  const onDelete = async (id) => {
    // TODO: delete meetup
    history.push('/');
  };

  return (
    <div>
      {
        (showLoading || !meetupDetails) ? (
          <Loading />
        ): (
          <div>
            <Row>
              <Col span = { 18 }>
                <Typography.Title>{meetupDetails.name}</Typography.Title>
              </Col >
              <Col span={6}>
                <Button>Add an Event</Button>
                <Button>Edit Group</Button>
                <Button type="danger" onClick={async () => await onDelete(id)}>Delete Group</Button>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Typography.Text>{meetupDetails.description}</Typography.Text>
              </Col>
            </Row>
            <Row gutter={[30, 0]}>
              <Col span={24}>
                <Divider>Events</Divider>
              </Col>
              {
                (meetupDetails.events && meetupDetails.events.length) ? (
                  meetupDetails.events.map(event => (
                    <Col span={8}>
                      <Card
                        cover={
                          <img
                            alt="example"
                            src={event.image}
                          />
                        }
                        actions={[
                          <Typography.Text>23 attendees</Typography.Text>,
                          <Typography.Text>{event.date}</Typography.Text>,
                          <Link to="/event/123">
                            <Icon type="eye" key="eye" />
                          </Link>
                        ]}
                      >
                        <Card.Meta
                          title={event.name}
                          description={event.description}
                        />
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col span={24}>
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={<span>No events</span>}
                    />
                  </Col>
                )
              }
            </Row>
          </div>
        )
      }
    </div>
  );
}

export default MeetupDetails;
