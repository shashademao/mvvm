function Watcher(vm,exp,fn){
    this.fn=fn
    this.vm=vm
    this.exp=exp

    this.get()
}
Watcher.prototype={
    update(){
        var newVal=this.vm[this.exp]
        this.fn(newVal)
    },
    get(){
        Dep.target=this
        var val=this.vm[this.exp]
        Dep.target=null
    }
}
