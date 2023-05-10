import { Card, Col, Row } from 'antd';
import React from 'react';
import './Cards.css'


export default function Cards() {
  
  return (
    <div className="">

      <div class="row">
        <div class="column">
          <div class="card">
            <h3>Card 1</h3>
            <p>Some text</p>
            <p>Some text</p>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <h3>Card 2</h3>
            <p>Some text</p>
            <p>Some text</p>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <h3>Card 3</h3>
            <p>Some text</p>
            <p>Some text</p>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <h3>Card 4</h3>
            <p>Some text</p>
            <p>Some text</p>
          </div>
        </div>
      </div>
    </div>
  )
}