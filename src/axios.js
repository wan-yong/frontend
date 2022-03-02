import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { message, Spin, Alert } from 'antd';
import './demo1.less';

const Axios = axios.create({
    // baseURL: process.env.BASE_URL,
    timeout: 20000,
})

let requestCount = 0

// show loading
function showLoading () {
    if (requestCount === 0) {
        var dom = document.createElement('div')
        dom.setAttribute('id', 'loading')
        document.body.appendChild(dom)
        ReactDOM.render(
            <Spin tip="loading..." size="large">
                <Alert
                 message="Please wait for response"
                 description="Further details will display soon."
                 type="info"
                />
            </Spin>, dom)
    }
    requestCount++
}

// hide loading
function hideLoading () {
    requestCount--
    if (requestCount === 0) {
        document.body.removeChild(document.getElementById('loading'))
    }
}

Axios.interceptors.request.use(config => {
   // Only the requestCount is 0, then display loading
    if (config.headers.isLoading !== false) {
        showLoading()
    }
    return config
}, err => {
    if (err.config.headers.isLoading !== false) {
        hideLoading()
    }
    return Promise.reject(err)
})

Axios.interceptors.response.use(res => {
    if (res.config.headers.isLoading !== false) {
        hideLoading()
    }
    return res
}, err => {
    if (err.config.headers.isLoading !== false) {
        hideLoading()
    }
    if (err.message === 'Network Error') {
        message.warning('Network Error')
    }
    if (err.code === 'ECONNABORTED') {
        message.warning('Time out')
    }
    return Promise.reject(err)
})

Component.prototype.$axios = Axios

export default Axios