function Mvvm(options){
    this.$options=options
    this.$methods=options.methods
    this.$data=options.data

    observe(this.$data)
    this.proxyData()

    new Compile(options.el, this);
}
Mvvm.prototype={
    proxyData(){
        Object.keys(this.$data).forEach(key=>{
            Object.defineProperty(this,key,{
                get(){
                    return this.$data[key]
                },
                set(newVal){
                    this.$data[key]=newVal
                }
            })
        })
    }
}
