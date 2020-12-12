/* eslint-disable no-lonely-if */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { productDetail as productServices } from '../../services';
import { dtiLogo } from '../../assets';
import './style.css';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(0);
  const { productId } = useParams();

  const onQty = (params) => {
    if (params) {
      if (qty > 0) {
        setQty(qty - 1);
      }
    } else {
      if (qty < product.max_promo_quantity) {
        setQty(qty + 1);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    productServices(productId)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  return (
    <div className="container">
      {console.log(product)}
      {!loading && product !== null ? (
        <>
          <div className="content_header">
            <span className="title">
              <strong>{`product/${product.name}`}</strong>
            </span>
          </div>
          <div className="content">
            <div className="content_desc">
              <img
                src={
                  product.variants[0].images[0]
                    ? product.variants[0].images[0].original_url
                    : dtiLogo
                }
                alt={product.name}
              />
              <div className="desc">
                <p className="desc_title">{product.name}</p>
                <p className="desc_product">{product.description}</p>
                <hr />
                <div className="desc_price">
                  <p className="tag">Harga</p>
                  <div>
                    <div>
                      <span className="disc">
                        {product.display_promo_price_percentage}
                      </span>
                      <p className="norm_price">{product.display_price}</p>
                    </div>
                    <p className="disp_price">{product.display_price}</p>
                  </div>
                </div>
                <hr />
                <div className="desc_qty">
                  <p className="tag">Jumlah</p>
                  <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                      <button
                        type="button"
                        className="input-group-text"
                        onClick={() => {
                          onQty(true);
                        }}
                      >
                        -
                      </button>
                    </div>
                    <input
                      className="qty"
                      type="text"
                      value={qty}
                      min="1"
                      max={product.max_promo_quantity}
                      onChange={(e) => {
                        setQty(Number(e.target.value));
                      }}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text"
                        onClick={() => {
                          onQty(false);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <br />
                    {qty > product.max_promo_quantity ? (
                      <div className="invalid">
                        {`Terlalu banyak, maks ${product.max_promo_quantity}.`}
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
                <hr />
                <div className="desc_unit">
                  <p className="tag">INFO PRODUK</p>
                  <div>
                    <span className="unit">BERAT</span>
                    <p className="disp_unit">{product.display_unit}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Skeleton className="m-5" height={100} />
      )}
    </div>
  );
};

export default ProductDetail;
