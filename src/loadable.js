
//这个文件是 只是用于解释 react-loadable的原理的
import React, {Component} from 'react';

const Loadable = ({
    loader,
    loading:Loading
 })=>{
    return class LoadableComponent extends Component {
        state = {
          LoadedComponent:null
        };
        componentDidMount(){
            //实际执行的是 import('./Dashboard')
            loader().then(res=>{
                this.setState({
                    LoadedComponent:res.default
                })
            })
        }
        render() {
            return (
                this.state.LoadedComponent
                ?
                <LoadedComponent/>
                :
                <Loading/>
            );
        }
    }
};

export default Loadable;