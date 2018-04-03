
function createNode(nodeName, nodeClass) {
	var node = document.createElement(nodeName);
	node.className = nodeClass;
	return node
}
function addClass(obj, cls) {
	var obj_class = obj.className,//获取 class 内容.
		blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
	added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
	obj.className = added;//替换原来的 class.
}
function fixTab(id, sHight) {
	var oTab = document.getElementById(id);
	var oThead = oTab.getElementsByTagName('thead')[0];
	var oTh = oThead.getElementsByTagName('th');
	var fixTableBox = oTab.parentNode

	//复制出的表头需要的容器
	var fixThead = createNode("div", "fixThead");
	var theadScroll = createNode("div", "theadScroll");
	var theadWrap = createNode("div", "theadWrap");
	//容器嵌套
	var cloneTab = oTab.cloneNode(true);
	cloneTab.setAttribute('id', '');
	addClass(cloneTab, 'cloneThead')

	fixThead.appendChild(cloneTab);
	theadScroll.appendChild(fixThead);
	theadWrap.appendChild(theadScroll);
	fixTableBox.appendChild(theadWrap);
	cloneTab.removeChild(cloneTab.getElementsByTagName('tbody')[0]);

	//本体table需要的容器
	var setWidth = createNode("div", "setWidth");
	var setHeight = createNode("div", "tbodyWrap setHeight");
	var outScroll = createNode("div", "outScroll");
	//容器嵌套
	setWidth.appendChild(oTab);
	outScroll.appendChild(setWidth);
	setHeight.appendChild(outScroll);
	fixTableBox.appendChild(setHeight);

	//根据列数设定表头容器宽度
	var thSize = oTh.length;
	if (thSize > 20) {
		setWidth.style.width = '4000px';
	} else if (thSize > 10) {
		setWidth.style.width = '3000px';
	} else {
		setWidth.style.width = '100%';
	}

	//跟随滚动
	setHeight.onscroll = function () {
		var left = setHeight.scrollLeft;
		theadScroll.scrollLeft = left;
	}

	//margin-top隐藏原表头
	var theadHight = oTab.getElementsByTagName('thead')[0].clientHeight;
	setHeight.style.marginTop = -theadHight - 1 + 'px';

	//动态调整
	function tabRevise() {
		//设定总容器高度
		if (sHight == 'auto') {
			var toTop = document.querySelector('#' + id).offsetTop;
			var winHeight = window.innerHeight;
			console.log(toTop);
			setHeight.style.height = winHeight - toTop -40 +'px';
		} else if (typeof (parseInt(sHight)) == 'number') {
			setHeight.style.height = sHight + 'px';
		}

		//逐列调整表头宽度
		for (var i = 0; i < oTh.length; i++) {
			fixTableBox.querySelector('.cloneThead').getElementsByTagName('th')[i].style.width = oTh[i].offsetWidth + 'px';
		}

		//固定表头容器宽度
		var tabContWidth = setWidth.clientWidth;
		fixThead.style.width = tabContWidth + 'px';
		var tabBoxWidth = outScroll.clientWidth;
		theadWrap.style.width = tabBoxWidth + 'px';
	}
	window.onresize = function () {
		tabRevise()
	}
	window.onload = function () {
		tabRevise()
	}
	tabRevise()
}