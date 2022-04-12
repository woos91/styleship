"use strict"
// import { defineComponent, computed, reactive } from 'vue'
import { useHead } from '@vueuse/head'
import extend from './extend'

const naverSiteVerification = '',
    domain = 'https://platform.styleship',
    title = '스타일쉽플랫폼',
    author = 'Styleship. Inc.',
    baseURL = process.env.BASE_URL.substr(process.env.BASE_URL.length-1) == "/" ? process.env.BASE_URL.substr(0, process.env.BASE_URL.length-1) : process.env.BASE_URL;
const setMeta = (options)=>{
    let currLink='', optn, value={title:title, link:[], meta:[]};
	options = options||{};
	if (options.target) {
		currLink = baseURL + options.target.$route.path;
	}
	optn = extend({
		naverSiteVerification: naverSiteVerification,
		viewport: 'width=device-width, initial-scale=1',
		charset: 'utf-8',
		isoCode: 'ko',
		domain: domain,
		title: title,
		type: 'website',
		desc: '',
		keyword: '',
		author: author,
		thumb: '',
		link: currLink,
		twitterCard: 'summary',
	}, options);

    if (optn.title) {
        value.title = optn.title;
		value.meta.push({name: 'og:title', content: optn.title });
		value.meta.push({name: 'twitter:title', content: optn.title });
	}
    if (optn.domain) value.link.push( {rel: "canonical", href: optn.domain} );
	if (optn.charset) value.meta.push({ charset: optn.charset });
	if (optn.type) value.meta.push({ name: 'og:type', content: optn.type });
	if (optn.viewport) value.meta.push({name: 'viewport', content: optn.viewport });
	if (optn.isoCode) value.meta.push({name: 'content-language', content: optn.isoCode });
	if (optn.desc) value.meta.push({name: 'description', content: optn.desc });
	if (optn.desc || optn.keyword) {
		value.meta.push({name: 'og:description', content: optn.viewport+optn.keyword });
		value.meta.push({name: 'twitter:description', content: optn.viewport+optn.keyword });
	}
	if (optn.keyword) value.meta.push({name: 'Keyword', content: optn.keyword });
	if (optn.author) value.meta.push({name: 'Author', content: optn.author });

	if (optn.link) {
		if (optn.domain) {
			value.meta.push({name: 'og:url', content: optn.domain+optn.link });
			value.meta.push({name: 'twitter:domain', content: optn.domain+optn.link });
		} else {
			value.meta.push({name: 'og:url', content: optn.link });
			value.meta.push({name: 'twitter:domain', content: optn.link });
		}
	}
	if (optn.twitterCard) value.meta.push({name: 'twitter:card', content: optn.twitterCard });
	if (optn.thumb) {
		if (optn.domain) {
			value.meta.push({name: 'og:image', content: optn.domain+optn.thumb });
			value.meta.push({name: 'twitter:image', content: optn.domain+optn.thumb });
		} else {
			value.meta.push({name: 'og:image', content: optn.thumb });
			value.meta.push({name: 'twitter:image', content: optn.thumb });
		}
	}
	if (optn.naverSiteVerification) value.meta.push({name: 'naver-site-verification', content: optn.naverSiteVerification });

    useHead(value);
}

export default setMeta;
