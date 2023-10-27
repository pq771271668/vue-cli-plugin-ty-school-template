import CONFIG from '@/api/getBaseURL.js'

import {debounce,throttle} from 'lodash'

//组件域地址
let selectorComponentContpath = CONFIG.baseURL.replace('zhxy-gateway-7','zhxy-app-component')
// console.log(CONFIG.baseURL,selectorComponentContpath)

const SELECTOR_COMPONENT_PLUGIN_TYPE_ENUM = ['teacher', 'student','inner_teacher'];
//获取jS参数进行解析
componentContpathConfigFormat();
//绑定返回监听
touchPersonPluginHistory();
//绑定的回调函数
let selectorCallBack = {};
//弹窗展示标识
//指定域，用于iframe回写及路由通知，避免窗口遍历postMessage
let selector_window_host = window.location.protocol + "//" +  window.location.host;
//ifame的路由
let selector_window_iframe_top_org = {};

let selector_window_iframe_active_org = {};

let selector_call_example = `
移动端选人使用示例：
执行touchSelectorPlugin方法，touchSelectorPlugin(dom, params, callback); 进行选人绑定
参数>
    1.dom 需要绑定的dom元素，最终会绑定点击事件，通过点击触发选人
    2.params初始化参数
        {
            "checkeds":""，//字符串 - 非必填 - 无默认 - 已选人，userid，英文逗号分隔，只需初始值，通过选人修改后的值，组件会自行记录
            "checkedDepts":""，//字符串 - 非必填 - 无默认 - 已选部门，deptid，英文逗号分隔，只需初始值，通过选人修改后的值，组件会自行记录
            "checkedSchools":""，//字符串 - 非必填 - 无默认 - 已选学校，orgid，英文逗号分隔，只需初始值，通过选人修改后的值，组件会自行记录
            "ticket":""， //字符串 - 非必填 - 无默认 - 登录ticket，若有值，优先拿ticket来获取平台码等信息
            "usessionid":"", //字符串 - 非必填 - 无默认 - 用户usessionid信息，功能与ticket一致
            "platfromcode":"",//字符串 - 必填 - 无默认 - - 平台编码
            "single":false, //布尔 - 非必填 - 默认false - 是否单选
            "title":"", //字符串 - 非必填- 无默认 - 选人弹窗标题，弹窗出现时的标题
            "type":"" //字符串 - 非必填 - 默认teacher - 选人类型，student、teacher
            "isChooseDept":"true", //布尔 - 非必填 - 默认true - 部门是否可以勾选
            "isChooseSchool":"false", //布尔 - 非必填 - 默认false - 学校是否可以勾选
            "classId":"", //字符串 - 非必填 - 无默认 - type为student生效，直接显示当前班级
        }
        ps：参数中 ticket和usessionid必须选择其一，用于组件用户信息
    3.callback 选人确认之后的回调函数，类型function；
    
by 智慧校园
`;
console.log(selector_call_example);
function touchSelectorPlugin(dom, params, callback){
    if(dom.length && dom.length > 0){
        dom = dom[0];
    }
    if(dom.length != null && dom.length != undefined && dom.length < 1){
        console.error("绑定元素为空，请检查");
        return;
    }
    if(!dom || dom == null || dom == undefined){
        console.error("绑定元素为空，请检查");
        return;
    }
    try{
        dom.getAttribute('A');
    }catch (e) {
        console.error("绑定元素不存在，请检查");
        return;
    }
    let ticket =  params.ticket;
    let usessionid =  params.usessionid;
    let platfromcode =  params.platfromcode;
    if(platfromcode == null || platfromcode == undefined || platfromcode.length < 1){
        console.error("选人组件初始化失败，params.platfromcode不能为空");
        return;
    }
    if((ticket == null || ticket == undefined || ticket.length < 1)
        && (usessionid == null || usessionid == undefined || usessionid.length < 1)){
        console.error("选人组件初始化失败，params.usessionid和params.ticket不能同时为空");
        return;
    }
    let id = selectorTargetUUID();
    selectorCallBack[id] = callback;
    dom.setAttribute("touch-selector-target", id);
    dom.classList.add(id);
    dom.classList.add("touch-selector-target-box");
    dom.dataset["checkeds"] = params.checkeds || '';
    dom.dataset["checkedDepts"] = params.checkedDepts || '';
    dom.dataset["checkedSchools"] = params.checkedSchools || '';
    dom.dataset["ticket"] = ticket || '';
    dom.dataset["usessionid"] = usessionid || '';
    dom.dataset["platfromcode"] = platfromcode || '';
    dom.dataset["single"] = params.single || false;
    dom.dataset["title"] = params.title || '';
    dom.dataset["type"] = params.type || 'teacher';
    dom.dataset["isChooseDept"] = params.isChooseDept;
    dom.dataset["isChooseSchool"] = params.isChooseSchool || false;
    dom.dataset["classId"] = params.classId || '';
    //模拟登录，校验登录信息
    selectorPluginSimulationLogin(id, platfromcode, ticket, usessionid, function(){
        dom.addEventListener('click', debounce(touchPersonSelectorPop,300), false);
    });
}
/**
 * @Author: zx
 * @Date: 2020/5/11 ;
 * @Description: 模拟登录;
 **/
function selectorPluginSimulationLogin(iframeid, platformcode, ticket, usessionid, callback){
    console.log('login...')
    if(ticket == null || ticket == undefined || ticket.length < 1 || ticket == 'null' || ticket == 'undefined'){
        ticket = '';
    }
    if(usessionid == null || usessionid == undefined || usessionid.length < 1 || usessionid == 'null' || usessionid == 'undefined'){
        usessionid = '';
    }
    let queryLoginData = {
        platformcode:platformcode,
        ticket:ticket,
        usessionid:usessionid
    };
    let request = new XMLHttpRequest();
    let url = selectorComponentContpath + "/selector/touch/login?iframeid=" + iframeid
    + "&platformcode=" + platformcode
    + "&ticket=" + ticket
    + "&usessionid=" + usessionid;
    request.open('POST', url);
    request.setRequestHeader("Content-type","application/json");
    request.setRequestHeader("Access-Control-Allow-Origin","*");
    request.setRequestHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    request.setRequestHeader("X-Powered-By","3.2.1");
    request.setRequestHeader("Access-Control-Allow-Headers","Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    request.send(null);
    request.onload = function(e){
        console.log("选人组件连接成功");
        if (request.status === 200) {
            let response = request.response;
            try{
                let obj = JSON.parse(response);
                if(obj.code == '0'){
                    console.log("选人组件绑定初始化成功");
                    callback();
                }else{
                    console.error(obj.msg, queryLoginData)
                }
            }catch (e) {
                console.error("组件绑定初始化失败", response)
            }
        }
        else{
            console.error("login requert set error")
        }
    }
    request.onerror = function(e){
        console.log("login connect error", e)
    }
}
/**
 * @Author: zengxiao@whty.com.cn
 * @Date: 2020/4/29 ;
 * @Description: 生成随机唯一标识;
 **/
let selectorTargetUUID = function(){
    let targetId = 'xxxxxxxx-xxxx-xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    return targetId;
}
/**
 * @Author: zengxiao@whty.com.cn
 * @Date: 2020/4/29 ;
 * @Description: 具体的选人弹窗;
 **/
let touchPersonSelectorPop = function(e){
    let target = positioningSelectorTarget(e.target);
    let dataset = target.dataset;
    let checkeds = dataset.checkeds;
    let ticket = dataset.ticket;
    let usessionid = dataset.usessionid;
    let platfromcode = dataset.platfromcode;
    let single = dataset.single;
    let checkedDepts = dataset.checkedDepts;
    let selectorType = dataset.type;
    let selectorData = {
        checkeds:dataset.checkeds,
        checkedDepts:dataset.checkedDepts,
        checkedSchools:dataset.checkedSchools,
        ticket:dataset.ticket,
        usessionid:dataset.usessionid,
        platfromcode:dataset.platfromcode,
        single:dataset.single,
        isChooseDept:dataset.isChooseDept,
        isChooseSchool:dataset.isChooseSchool,
        classId:dataset.classId,
        type:dataset.type,
    };
    if(isEmpty(selectorType) || SELECTOR_COMPONENT_PLUGIN_TYPE_ENUM.indexOf(selectorType) < 0){
        selectorType = 'teacher';
    }
    if(single == null || single == undefined || single == '' || single == 'null' || single == 'undefined' || single == 'false'){
        single = false;
    }
    let targetId = target.getAttribute("touch-selector-target");
    //创建iframe
    //弹窗
    let ckbox = document.createElement('div');
    ckbox.setAttribute('id', targetId);
    ckbox.classList.add('touch-selector-plugin-ckbox');
    selectorWeuiPopupCssDom(ckbox, weuiPopup__container);
    let overlay = document.createElement('div');
    selectorWeuiPopupCssDom(overlay, weuiPopup__overlay);
    ckbox.appendChild(overlay);
    let modal = document.createElement('div');
    selectorWeuiPopupCssDom(modal, weuiPopup__modal);
    let iframe = document.createElement('iframe');
    iframe.setAttribute('id', targetId + "-iframe");
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.classList.add("selector-plugin-view-iframe");
    let uriKey = selectorType + (single ? "-single" : "");
    let iframeUri = "/selector/touch/new/index";
    let iframeSrc =  selectorComponentContpath + iframeUri + '?iframeid=' + targetId;
    iframeSrc += "&platformcode=" + platfromcode;
    iframeSrc += "&usessionid=" + usessionid;
    iframeSrc += "&type=" + uriKey;
    if(ticket != null && ticket != undefined && ticket != 'undefined' && ticket != 'null' && ticket.trim().length > 0){
        iframeSrc += "&ticket=" + ticket;
    }
    iframeSrc += "&r=" + selectorTargetUUID();
    iframeSrc += "&selectorWindowHost=" + selector_window_host;
    iframe.src = iframeSrc;
    modal.appendChild(iframe);
    ckbox.appendChild(modal);
    document.body.appendChild(ckbox);
    if (iframe.attachEvent){
        iframe.attachEvent("onload", function(){
            iframe.postMessage(selectorData, selectorComponentContpath);
            selectorIframePopup(modal, ckbox, overlay);
            iframe.style.width = '100%';
            iframe.style.height = '100%';
        });
    } else {
        iframe.onload = function(){
            iframe.contentWindow.postMessage(selectorData, selectorComponentContpath);
            selectorIframePopup(modal, ckbox, overlay);
            iframe.style.width = '100%';
            iframe.style.height = '100%';
        };
    }
    touchPersonPluginTitle(dataset.title);
}

/**
 * @Author: zx
 * @Date: 2020/5/8 ;
 * @Description: 定位绑定元素;
 **/
function positioningSelectorTarget(target){
    if(target == null || target == undefined){
        return null;
    }
    let is = target.classList.contains('touch-selector-target-box')
    if(is){
        return target;
    }else{
      return positioningSelectorTarget(target.parentElement);
    }
}

/**
 * @Author: zengxiao@whty.com.cn
 * @Date: 2020/4/29 ;
 * @Description: 打开弹窗;
 **/
function selectorIframePopup(modal, ckbox, overlay){
    //模拟一个伪跳转，路径前进一个节点
    window.history.pushState({page:99999}, null, '#touch-person-plugin');
    window.history.forward(1);
    modal.style.transform = "translate3d(0,0,0)";
    modal.style.opacity = "1";
    ckbox.style.display = "block";
    overlay.style.opacity = "1";
}
/**
 * @Author: zengxiao@whty.com.cn
 * @Date: 2020/4/29 ;
 * @Description: 关闭弹窗;
 **/
function selectorIframeClosePopup(){
    let ckbox = document.getElementsByClassName('touch-selector-plugin-ckbox')[0];
    if(ckbox != undefined){
        let _parentElement = ckbox.parentNode;
        if(_parentElement){
            _parentElement.removeChild(ckbox);
        }
    }
    let titleTag = document.getElementsByTagName("title")[0];
    titleTag.innerText = titleTag.getAttribute('recordTitle');
}
/**
 * @Author: zengxiao@whty.com.cn
 * @Date: 2020/4/29 ;
 * @Description: 接受回调数据，执callback回写;
 **/
window.addEventListener('message',function(e){
    let callBackData = e.data;
    if(callBackData["type"] == 1){
        let tagid = callBackData["touch-selector-target"];
        let tpsElement = document.getElementsByClassName(tagid)[0];
        let userDatas = callBackData["selectdata"].users;
        let users = [];
        if(userDatas){
            for(let t in userDatas){
                let item = userDatas[t];
                users.push(item.id);
            }
        }
        let depts = [];
        if(callBackData["selectdata"].depts){
            for(let t in callBackData["selectdata"].depts){
                let item = callBackData["selectdata"].depts[t];
                depts.push(item.id);
            }
        }
        let schools = [];
        if(callBackData["selectdata"].schools){
            for(let t in callBackData["selectdata"].schools){
                let item = callBackData["selectdata"].schools[t];
                schools.push(item.id);
            }
        }
        tpsElement.dataset.checkeds = users.join(",");
        tpsElement.dataset.checkedDepts = depts.join(',');
        tpsElement.dataset.checkedSchools = schools.join(',');
        let callback = selectorCallBack[tagid];
        if(callback){
            callback(callBackData["selectdata"]);
        }
        selector_window_iframe_active_org = selector_window_iframe_top_org
        window.history.back(1);
        selectorIframeClosePopup();
    }else if(callBackData["type"] == "router"){
        selectorRouteHistory(callBackData["router"]);
    }else if(callBackData["type"] == "create"){
        selector_window_iframe_top_org = callBackData["router"];
        selector_window_iframe_active_org = callBackData["router"];
    }
})
/**
 * @Author: zx
 * @Date: 2020/5/12 ;
 * @Description: 路由回退;
 **/
function selectorRouteHistory(data){
    if(data.id){
        selector_window_iframe_active_org = data;
    }
    selector_window_iframe_active_org['component'] = data.component;
    console.log('iframe内部节点切换，路由跳转了', selector_window_iframe_active_org);
}

/**
 * @Author: zengxiao@whty.com.cn
 * @Date: 2020/4/29 ;
 * @Description: 解析当前引用js的参数;
 **/
function componentContpathConfigFormat(){
    let thisPageScripts = document.getElementsByTagName("script");
    for (let i = 0; i < thisPageScripts.length; i++) {
        let script = thisPageScripts[i];
        let src = script.src;
        if(src == null || src == undefined || src.length < 1 || src == 'null' || src == 'undefined'){
            continue;
        }
        if(src.indexOf('/js/touch-person-plugin.js') > 0){
            selectorComponentContpath = src.split('?')[0].replace('/js/touch-person-plugin.js', '');
            break;
        }
    }
}

/**
 * @Author: zx
 * @Date: 2020/5/4 ;
 * @Description: 重设选人标题;
 **/
function touchPersonPluginTitle(popupTitle){
    let titleTag = document.getElementsByTagName("title")[0];
    let curtitle = titleTag.innerText;
    titleTag.setAttribute('recordTitle', curtitle);
    if(popupTitle != null && popupTitle != undefined && popupTitle != 'null' && popupTitle != 'undefined' && popupTitle.trim().length > 0){
        titleTag.innerText = popupTitle;
    }
}

/**
 * @Author: zx
 * @Date: 2020/5/4 ;
 * @Description: 弹窗返回事件;
 **/
function touchPersonPluginHistory(){
    if (window.history && window.history.pushState) {
        window.addEventListener('popstate', function(e){
            console.log('主窗口回退，当前路由：', selector_window_iframe_active_org);
            if(selector_window_iframe_top_org.id == selector_window_iframe_active_org.id && (selector_window_iframe_active_org['component'] == "CompontentIndex" || selector_window_iframe_active_org['component'] == "index")){
                selectorIframeClosePopup();
            }else{
                selectorPluginIFrameHistoryBack();
                e.stopPropagation();
            }
        })
    }
}
/**
 * @Author: zx
 * @Date: 2020/5/12 ;
 * @Description: 主窗口回退事件;
 **/
function selectorPluginIFrameHistoryBack(){
    let iframe = document.getElementsByClassName("selector-plugin-view-iframe")[0];
    let selectorData = {
        messageType:"back"
    };
    if (iframe.attachEvent){
        iframe.postMessage(selectorData, selectorComponentContpath);
    } else {
        iframe.contentWindow.postMessage(selectorData, selectorComponentContpath);
    }
    window.history.pushState({page:99999}, null, '#touch-person-plugin');
    window.history.forward(1);
}

/**
 * @Author: zx
 * @Date: 2020/5/4 ;
 * @Description: 判断字符是否为空;
 **/
function isEmpty(param) {
    if (param == null)
        return true;
    if (param == '')
        return true;
    if (param == undefined)
        return true;
    if (param == {})
        return true;
    if (param == [])
        return true;
    if (param.trim().length < 1)
        return true;
    return false;
}

/**
 * @Author: zengxiao@whty.com.cn
 * @Date: 2020/4/29 ;
 * @Description: 加载组件外层weui样式;
 **/
function selectorWeuiPopupCssDom(dom, css){
    for(let key in css){
        dom.style[key] = css[key];
    }
}
//weiui组件外层元素样式
const weuiPopup__container = {
    'z-index': 100,
    'position': 'fixed',
    'bottom': '0',
    'left': '0',
    'right': '0',
    'width': '100%',
    'height': '100%',
    'padding': 0,
    'margin': '0',
    'display': 'none'
}
const weuiPopup__overlay = {
    'z-index': 100,
    'position': 'fixed',
    'bottom': '0',
    'left': '0',
    'right': '0',
    'width': '100%',
    'height': '100%',
    'padding': '0',
    'margin': '0',
    'background-color': 'rgba(0,0,0,.6)',
    'transition': 'opacity .3s'
}
const weuiPopup__modal = {
    'width': '100%',
    'position': 'absolute',
    'z-index': '100',
    'bottom': '0',
    'opacity': '.6',
    'border-radius': '0',
    'color': '#3d4145',
    '-webkit-transition-duration': '.3s',
    'transition-duration': '.3s',
    'height': '100%',
    'background': '#efeff4',
    '-webkit-transform': 'translate3d(0,100%,0)',
    '-webkit-transition-property': 'opacity,-webkit-transform',
    'transition-property': 'opacity,-webkit-transform',
    'transition-property': 'transform,opacity',
    'transition-property': 'transform,opacity,-webkit-transform',
    'overflow-x': 'hidden',
    'overflow-y': 'auto',
    'padding': '0',
    'margin': '0'
}
export default touchSelectorPlugin