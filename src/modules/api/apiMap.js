"use strict";

let apiMap = {
	// Banner
	BANNER_LIST:	{ method: "get",	useAuth:false,	name: "banner/bannerList.asp" },		// 배너 목록
	
	// File
	// FILE_UPLOAD:	{ method: "post",	useAuth:null, 	name: "FileUpload" ,		headers:{contentType:"multipart/form-data"} },				// 찜하기 전체 삭제

};
// useAuth : false (not use auth), true (use auth), null (free auth)
export default apiMap;
