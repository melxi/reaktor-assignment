import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/productActions';
import {
  List,
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer
} from 'react-virtualized';

export default function Products(props) {
  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100
    })
  )
  const category = props.match.params.category ? props.match.params.category : 'jackets';
  const productsList = useSelector((state) => state.products);
  const { products, isLoading } = productsList;
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts(category));
  }, [category]);

  if (isLoading) {
    return null;
  }

  function rowRenderer({
    key,
    index,
    style,
    parent
  }) {
    const product = products[index];
    return (
      <CellMeasurer 
        key={key}
        cache={cache.current}
        parent={parent}
        columnIndex={0}
        rowIndex={index}  
      >
        <div style={style}>
          <p>product name: {product.name}</p>
          <p>brand: {product.manufacturer}</p>
          <p>price: {product.price}$</p>
          <p>type: {product.type}</p>
          <p>available: {xmlParser(product.DATAPAYLOAD)}</p>
        </div>
      </CellMeasurer>
    );
  }

  const xmlParser = (xml) => {
    let parser = new DOMParser()
    let doc = parser.parseFromString(xml, "text/xml");

    if (!isLoading && doc.getElementsByTagName('INSTOCKVALUE')[0]) {
      return doc.getElementsByTagName('INSTOCKVALUE')[0].innerHTML;
    } else {
      return "NO INFO"
    }
  }

  return (
    <div style={{margin: '0 auto', height: '100vh', width: '30%', border: '1px solid #000'}}>
      <AutoSizer>
        {({width, height}) => (
          <List 
            width={width} 
            height={height} 
            rowCount={products.length} 
            rowHeight={cache.current.rowHeight}
            deferredMeasurementCache={cache.current} 
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </div>
  )
}