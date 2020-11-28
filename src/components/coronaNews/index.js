/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { Timeline } from 'antd';
import ReactPaginate from 'react-paginate';
import app from '../../services/firebase';

import 'firebase/database';
import './style.css';
import 'antd/dist/antd.css';

const CoronaNews = () => {
  const { newsId } = useParams();
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const page = 5;
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
      setNews(
        firebaseNews.data.filter((f) => {
          if (newsId != null) {
            if (f.id == newsId) return f;
          } else {
            return f;
          }
        })
      );
      setIsLoading(false);
    });
  }, [offset, newsId]);

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
                  <Link to={`/infoCorona/${data.id}`}>
                    {data.date.split('T')[0]}
                  </Link>
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
            breakLabel=". . ."
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
