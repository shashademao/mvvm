function defineReactive(data,key,val){  //闭包 dep被引用
    observe(val)
    var dep=new Dep()
    Object.defineProperty(data,key,{    
        get(){
            if(Dep.target){ 
                dep.depend(Dep.target) 
            }
            return val
        },
        set(newVal){
            if(val===newVal){
                return 
            }
            val=newVal
            observe(val)
            dep.notify()
        }
    })
}
function observe(data){
    if(!data||typeof data!=='object'){
        return
    }
    Object.keys(data).forEach(key=>{
        defineReactive(data,key,data[key])
    })
}


function Dep(){
    this.subs=[]
}
Dep.prototype={
    depend(sub){
        this.subs.push(sub)
    },
    notify(){
        this.subs.forEach(sub=>sub.update())
    }
}
Dep.target=null