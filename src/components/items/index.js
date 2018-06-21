import React, { Component } from 'react';
import CheckStatus from './CheckStatus'
import PlaceItem from './PlaceItem'
import TransferItem from './TransferItem'

function ItemsView(props) {
    return (
      <div>
        <h1>Items</h1>
        <CheckStatus/>
        <PlaceItem/>
        <TransferItem/>
      </div>
    )
}

export default ItemsView