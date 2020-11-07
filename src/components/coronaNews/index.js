import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Timeline } from 'antd';
import ReactPaginate from 'react-paginate';
import app from '../../services/firebase';

import 'firebase/database';
import './style.css';
import 'antd/dist/antd.css';

const CoronaNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const page = 2;
  const pageCount = Math.ceil(news.length / page);
  const [offset, setOffset] = useState(0);
  const newsSlice = news.slice(offset, offset + page);
  const handlePageClick = (e) => {
    const { selected } = e;
    setOffset(Math.ceil(selected * page));
  };

  useEffect(() => {
    setIsLoading(true);
    const db = app.database().ref('news');
    db.on('value', (snapshot) => {
      const firebaseNews = snapshot.val();
      setNews(firebaseNews.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="container">
      <h2>Corona News</h2>
      {isLoading ? (
        <div className="early-load">
          <Skeleton count={5} />
        </div>
      ) : (
        <div className="newsList">
          <Timeline>
            {newsSlice.map((data) => {
              return (
                <Timeline.Item key={data.id}>
                  {data.date.split('T')[0]}
                  <ul>
                    {data.activity.map((dataActivity, i) => {
                      return (
                        // eslint-disable-next-line react/no-array-index-key
                        <li key={i}>
                          <a
                            href={dataActivity.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <strong>{dataActivity.title}</strong>
                          </a>
                          <p>{dataActivity.desc}</p>
                        </li>
                      );
                    })}
                  </ul>
                </Timeline.Item>
              );
            })}
          </Timeline>
          <ReactPaginate
            previousLabel="👈"
            nextLabel="👉"
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
      )}
    </div>
  );
};

export default CoronaNews;
