import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Empty } from 'antd';
import { Link } from 'react-router-dom';

async function getListOfMeetups(setMeetups) {
  const meetups = [{
    _id: '1',
    name: 'JS Belgrade',
    description: 'JS Belgrade is JavaScript User Group from Belgrade. Our goal is to connect Belgrade\'s JavaScript community through monthly meetups.'
  }, {
    _id: '2',
    name: 'Serverless Belgrade',
    description: 'A group for serverless enthusiasts, living, working or passing through Belgrade. We\'ll organize occasional meetups and workshops.'
  }, {
    _id: '3',
    name: 'Programeri Crne Gore',
    description: 'Cilj grupe je da okupi programere Crne Gore. Namjena Facebook grupe je prvjenstveno za obavestenja i inicjalno upoznavanje. Za diskusije i razmjene iskustava smo postavili forum na našem web sajtu na adresi: http://programeri.me'
  }];
  setMeetups(meetups);
}

function Meetups() {
  const [meetups, setMeetups] = useState(0);
  const [loadMeetupsIntent, /* setLoadMeetupsIntent */] = useState([]);
  useEffect(() => {
    if (loadMeetupsIntent) {
      getListOfMeetups(setMeetups);
    }
  }, [ loadMeetupsIntent ]);

  // subscribeToNewMeetups(() => {
  //   setLoadMeetupsIntent(true);
  // })
  
  return (
    <div>
      {
        meetups ? (
          <Row gutter={[16, 16]}>
            {
              meetups.map(meetup => (
                <Col xs={{ span: 8 }} lg={{ span: 6 }}>
                  <Card title={meetup.name} extra={<Link to={'/meetup/' + meetup.id}>More</Link>}>
                    {meetup.description}
                  </Card>
                </Col>
              ))
            }
          </Row>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
            description={
              <span>
                No meetups
              </span>
            }
          />
        )
      }
    </div>
  );
}

export default Meetups;
