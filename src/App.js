import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import { Input } from 'antd';
import { Card } from 'antd-mobile';
import axios from "./axios.js";
import './App.css';
import styles from './demo1.less';

const { Search } = Input;

const App = () => { 
  const [data, setData] = useState(
  {
	"tokenId": "",
	"ownerAddress": "",
	"metadata": "",
	"metadataURI": "",
	"metadataGatewayURL": "",
	"assetURI": "",
	"assetGatewayURL": "",
	"assetDataBase64": "",
	"assetDataText": ""
  });
  
  const [query, setQuery] = useState('1');

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
	  if (query) { 
	    let result = await axios('http://47.241.24.12:8081/assets/' + query + '?assetInfo=true');
/* 		let result = {
			"data": {
				"tokenId": "1643957012294",
				"ownerAddress": "x509::/OU=org1/OU=client/OU=department1/CN=minter::/C=US/ST=North Carolina/L=Durham/O=org1.example.com/CN=ca.org1.example.com",
				"metadata": {
					"name": "Art #1",
					"description": "This serves as proof-of-ownership.",
					"image": "ipfs://bafybeiamwa5yumt2rcjnnoofgbrxpbhcofceemqhvvda247uunra4dt42e/art.txt"
				},
				"metadataURI": "bafybeihytaklbwfqcyp6svivqm7z3je6ebyasws4tgihsxdpdm2qur3bsu/metadata.json",
				"metadataGatewayURL": "https://ipfs.infura.io:8080/ipfs/bafybeihytaklbwfqcyp6svivqm7z3je6ebyasws4tgihsxdpdm2qur3bsu/metadata.json",
				"assetURI": "ipfs://bafybeiamwa5yumt2rcjnnoofgbrxpbhcofceemqhvvda247uunra4dt42e/art.txt",
				"assetGatewayURL": "https://ipfs.infura.io:8080/ipfs/bafybeiamwa5yumt2rcjnnoofgbrxpbhcofceemqhvvda247uunra4dt42e/art.txt",
				"assetDataBase64": "QXJ0IGZvciBtZQoKKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqCkl0IHdhcyBtaW50ZWQgYXMgdGhlIE5GVCwgd2hpY2ggZm9sbG93cyBlcmM3MjEgc3BlYy4KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqCgpQdXQgdGhlIGNvbnRlbnQgaGVyZSwgaWYgYW55LgoKQ3JlYXRlZCBieSBBcnRpc3QgW3NvbWVvbmVdCg=="
			},
			"status": 200,
			"statusText": "OK",
			"headers": {
				"content-length": "1101"
			},
			"config": {
				"transitional": {
					"silentJSONParsing": true,
					"forcedJSONParsing": true,
					"clarifyTimeoutError": false
				},
				"transformRequest": [null],
				"transformResponse": [null],
				"timeout": 0,
				"xsrfCookieName": "XSRF-TOKEN",
				"xsrfHeaderName": "X-XSRF-TOKEN",
				"maxContentLength": -1,
				"maxBodyLength": -1,
				"headers": {
					"Accept": "application/json, text/plain,*"
				},
				"url": "http://8.214.184.93:8081/assets/1643957012294?assetInfo=true",
				"method": "get"
			},
			"request": {}
		}; */
		
		console.log("******Get Response********");
	    console.log(JSON.stringify(result.config));
		
		const data64 = result.data.assetDataBase64;
		const buff = new Buffer(data64, 'base64');
		result.data.assetDataText = buff.toString('ascii');
		console.log("******Text********");
		console.log(result.data.assetDataText);
		
        if (!ignore) {
			setData(result.data);
		}
	  }
    }

    fetchData();
    return () => { ignore = true; }
  }, [query]);

  return (
	<>
    	<Search value={query} 
		placeholder="input tokenId"
		allowClear
		enterButton="Search"
		size="large"
		onChange={e => setQuery(e.target.value)} />

		<Card
          headerStyle={{
            color: '#1677ff',
          }}
          bodyClassName={styles.customBody}
          title='ownerAddress'
        >
          {data.ownerAddress}
        </Card>
	  
	  
        <Card
          headerStyle={{
            color: '#1677ff',
          }}
          bodyClassName={styles.customBody}
          title='metadata'
        >
          {JSON.stringify(data.metadata)}
        </Card>
		
		
		<Card
          headerStyle={{
            color: '#1677ff',
          }}
          bodyClassName={styles.customBody}
          title='base64'
        >
          {data.assetDataBase64}
        </Card>
		
		<Card
          headerStyle={{
            color: '#1677ff',
          }}
          bodyClassName={styles.customBody}
          title='text'
        >
          {data.assetDataText}
        </Card>	
	</>
)};

export default App;