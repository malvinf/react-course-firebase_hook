/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { product as productServices } from '../../services';
import { dtiLogo } from '../../assets';
import './style.css';

const Product = () => {
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = (e) => {
    setSearch(e);
  };

  const goSearch = () => {
    setLoading(true);
    productServices(10, search.length > 0 ? 0 : offset, search)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    productServices(10, search.length > 0 ? 0 : offset, search)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [offset]);

  const handlePageClick = (data) => {
    const { selected } = data;
    setOffset(10 * selected);
  };

  return (
    <div className="container">
      <div className="content_header">
        <span className="title">
          <strong>Product</strong>
        </span>
        <div className="searchbar">
          <div className="input-group input-group-sm mb-3">
            <input
              type="text"
              className="form-control"
              name="search"
              value={search}
              onChange={(e) => {
                onSearch(e.target.value);
              }}
            />
            <div className="input-group-append">
              <button
                type="button"
                className="input-group-text"
                id="search"
                onClick={() => {
                  goSearch();
                }}
              >
                Cari
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        {!loading ? (
          <div>
            <div className="card-deck">
              {product.map((p) => {
                if (p.in_stock) {
                  return (
                    <Link to={`/product/${p.id}`} key={p.id} className="card">
                      <img
                        src={
                          p.variants[0].images[0]
                            ? p.variants[0].images[0].original_url
                            : dtiLogo
                        }
                        className="card-img-top"
                        alt={p.brand.name}
                      />
                      <hr />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <div className="normalprice m-0">
                          <span className="normalprice_disc">
                            {p.display_promo_price_percentage}
                          </span>{' '}
                          <span className="normalprice_price">
                            {p.display_normal_price}
                          </span>
                        </div>
                        <span className="card-text">{p.display_price}</span>
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          <Skeleton height={100} />
        )}
      </div>
      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={10}
        onPageChange={(data) => {
          handlePageClick(data);
        }}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default Product;
