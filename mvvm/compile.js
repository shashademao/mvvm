function Compile(el, vm) {
    this.vm = vm
    this.el = document.querySelector(el)
    this.fragment = this.node2Fragment(this.el)
    this.compile(this.fragment)
    this.el.appendChild(this.fragment)
}
Compile.prototype = {
    node2Fragment(el) {
        var fragment = document.createDocumentFragment(),
            child
        while (child = el.firstChild) {
            fragment.appendChild(child)
        }
        return fragment
    },
    compile(frag) {
        var nodes = [...frag.childNodes]
        nodes.forEach(node => {
            var txt = node.textContent
            var reg = /{{([a-zA-Z$_][a-zA-Z0-9$_\.]*)}}/g

            if (node.nodeType === 3 && reg.test(txt)) {     // 文本节点
                var val = this.vm[RegExp.$1]
                node.textContent = txt.replace(reg, val)

                new Watcher(this.vm, RegExp.$1, newVal => {
                    node.textContent = newVal
                })
            }

            if (node.nodeType === 1) {      //  元素节点
                var nodeAttr = [...node.attributes]
                nodeAttr.forEach(attr => {
                    var name = attr.name
                    var exp = attr.value
                    if (name.includes('v-model')) {
                        node.value = this.vm[exp]
                        new Watcher(this.vm, exp, (newVal) => {
                            node.value = newVal
                        })
                        node.addEventListener('input', e => {
                            var newVal = e.target.value
                            this.vm[exp] = newVal
                        })
                    }
                    if(name.includes('v-click')){
                        node.addEventListener('click',this.vm.$methods[exp].bind(this.vm))
                    }

                })
            }

            if (node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })
    },
}