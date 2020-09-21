import * as React from 'react';

import {Layout, Tabs, Space, Button, Tag, Spin, List, Modal, message, Input, Divider, Row, Col} from 'antd'
import {UserOutlined,SyncOutlined} from '@ant-design/icons'
import './App.less';
import './css/style.css'
import MyInfo from "./components/MyInfo";
import V3 from "./components/V3"
import V6 from "./components/V6"
import {ItemProps} from "./components/ItemProps";
import service from "./service/service";
import * as utils from './common/utils'
import contract, {Detail, Users, X3, X6} from './service/contract'
import * as config from "./service/config";
import BigNumber from "bignumber.js";
import i18n from './i18n'

const {Header, Footer, Content} = Layout;
const {TabPane} = Tabs;
function callback(key: any) {
    console.log(key);
}
interface Props{
    setRefCode:(v:any)=>void;
    register:()=>void;
    info:Users
    account:any
    detail:Detail
}
export interface State {
    accounts:Array<any>
    account:any
    info:Users
    isUserExists:boolean
    x3Map?:Map<number,X3>
    x6Map?:Map<number,X6>
    refCode?:any
    spinning:boolean
    detail:Detail,
    
}

class App extends React.Component<any,State> {

    state:State = {
        info:{id:0,referrer:"",partnersCount:0,x6Income:new BigNumber(0),x3Income:new BigNumber(0),activeS6Levels:[],activeS3Levels:[],latestShareAmount:new BigNumber(0),latestShareDay:0},
        accounts:[],
        account:{},
        isUserExists:false,
        spinning:false,
        detail:{lastId:1,total:new BigNumber(0),burnOf:new BigNumber(0),cy:config.useCoin}
    }

    componentDidMount(): void {
        service.initDApp().catch();

        this.getAccountList().then(()=> {

        })
        let interId:any = sessionStorage.getItem("interId")
        if(interId){
            clearInterval(interId)
        }
        interId = setInterval(()=>{
            this.genInfo().catch();
        },5 * 1000)
        sessionStorage.setItem("interId",interId)

    }

    async getAccountList(){
        const data:any = await service.accountList();
        this.setState({
            accounts:data,
            account:data?data[0]:{  }
        })
        this.genInfo(data&&data[0]).catch();
    }

    async genInfo(account?:any){
        if(!account){
            account = this.state.account;
        }
        const mainPKr:string = account.MainPKr;
        const info:any = await contract.info(mainPKr)
        const detail:any = await contract.detail(mainPKr)
        const isUserExists:any = await contract.isUserExists(mainPKr)
        this.setState({
            isUserExists:isUserExists,
            info:info,
            detail:detail
        })

        this.genMatrix(info).catch();
    }

    async genMatrix(info:Users){
        const {account,isUserExists} = this.state;
        if(account && account.MainPKr){
            const mainPKr = account.MainPKr;
            const x3Map:Map<number,X3> = new Map()
            const x6Map:Map<number,X6> = new Map()
            for(let i=1;i<=12;i++){
                if(isUserExists){
                    if(info.activeS3Levels[i-1]){
                        const usersActiveX3Levels:any = await contract.usersActiveX3Levels(mainPKr,i)
                        if(!!usersActiveX3Levels){
                            const usersX3Matrix = await contract.usersX3Matrix(mainPKr,i)
                            x3Map.set(i,usersX3Matrix)
                        }
                    }

                    if(info.activeS6Levels[i-1]){
                        const usersActiveX6Levels:any = await contract.usersActiveX6Levels(mainPKr,i)
                        if(!!usersActiveX6Levels){
                            const usersX6Matrix = await contract.usersX6Matrix(mainPKr,i)
                            x6Map.set(i,usersX6Matrix)
                        }
                    }

                }
            }

            this.setState({
                x3Map:x3Map,
                x6Map:x6Map
            })
        }

    }

    setAccount = (v:any,modal:any)=>{
        if(v){
            this.setState({
                account:v
            })
            // const o:any = document.getElementsByClassName("ant-popover");
            // if(o){
            //     o[0].className += 'ant-popover-hidden';
            // }
            this.genInfo(v).catch()
            if(modal){
                modal.destroy();
            }
        }
    }

    active = (type:number,level:number) =>{
        const {account,info} = this.state;
        let modalId:any = null;
        modalId = Modal.confirm({
            title:i18n.t("buyNewLevel"),
            content:<div>
                {i18n.t("active")}{type==1?"V3":"V6"}{i18n.t("matrix")}Level{level}{i18n.t("need")}<strong>{config.levelPrice * 2 ** (level-1) + 10}</strong> {config.useCoin}
            </div>,
            onCancel:()=>{
                modalId.destroy();
            },
            onOk:(e)=>{
                modalId.destroy();
                const income :any = type==1?info.x3Income.toNumber():info.x6Income.toNumber();
                if(level>=7 && income < config.levelPrice * 2 ** (level-1)){
                    message.error(`${i18n.t("active")} Level${level} ${i18n.t("need")} ${type==1?"V3":"V6"} ${i18n.t("income")} > ${config.levelPrice * 2 ** (level-1)}`)
                    return;
                }else{
                    contract.activeMatrix(account,type,level).then((hash)=>{
                        message.success(hash)
                        this.showSpin(hash);
                    }).catch(error=>{
                        const err = typeof e === "object"?e.message:error;
                        message.error(err)
                    })
                }
            }
        })
    }

    setRefCode = (v:any)=>{
        if(v){
            this.setState({
                refCode:v
            })
        }
    }

    register =()=>{
        const {refCode,account} = this.state;
        if(!refCode){
            message.warning(i18n.t("inputCode"))
            return
        }
        contract.registrationExt(account,refCode).then(hash=>{
            message.success(hash)
            this.showSpin(hash);
        }).catch((e:any)=>{
            const err = typeof e === "object"?e.message:e;
            message.error(err);
        })
    }

    reward = ()=>{
        console.log("reward");
        const {account} = this.state;
        contract.reward(account).then(hash=>{
            message.success(hash)
            this.showSpin(hash);
        }).catch((e:any)=>{
            const err = typeof e === "object"?e.message:e;
            message.error(err);
        })
    }

    showAccountModal = ()=>{

        const {accounts} = this.state;

        if(accounts){
            let modalId:any = null;
            modalId = Modal.info({
                icon:<UserOutlined/>,
                title:i18n.t("selectAccount"),
                content:<List>
                    {
                        accounts.map(v=>{
                            return <List.Item onClick={()=>this.setAccount(v,modalId)}>{v.Name}({utils.ellipsis(v.MainPKr)})</List.Item>
                        })
                    }
                </List>
            })
        }
    }

    showSpin(hash:string){
        this.setState({
            spinning:true
        })
        let interId:any ;
        interId = setInterval(()=>{
            service.rpc("sero_getTransactionReceipt",[hash]).then((rest:any)=>{
                if(rest.status){
                    clearInterval(interId)
                    this.setState({
                        spinning:false
                    })
                    this.genInfo().catch()
                }
            })
        },1000)
    }
    render() {
        const {account,accounts,info,x3Map,x6Map,isUserExists,spinning,detail} = this.state;
        console.log(account,"account")
        let value:any = '0.000'
        if(account && account.Balance){
            value = utils.fromValue(account.Balance.get(config.useCoin),18).toFixed(3,1)
        }
        // let startMainPKr = account.MainPkr.substr(0,15);
        // let endMainPKr = account.MainPKr.substring(account.MainPKr.length-15);
        const itemX3:Array<ItemProps> = [];
        const itemX6:Array<ItemProps> = [];
        for(let i=1;i<=12;i++){
            const item:ItemProps = { isActive:false, value:config.levelPrice * 2 ** (i-1), count:0,secondCount:0, people:0, reinvest:0, type:1, i:i ,blocked:false,placeArr:[],placeSource:[]};
            if(x3Map &&x3Map.has(i)){
                const x3:X3 | undefined = x3Map.get(i);

                if(x3){
                    const count:number = x3.referrals?x3.referrals.length:0;
                    const reinvest:number = x3.reinvestCount?x3.reinvestCount:0;
                    const partnersCount:number = x3.partnersCount?x3.partnersCount:0;
                    item.isActive = true;
                    item.blocked = x3.blocked;
                    item.count = count;
                    item.people = partnersCount;
                    item.reinvest = reinvest;
                    item.placeArr = x3.placeArr;
                    item.placeSource = x3.placeSource;
                }
            }
            itemX3.push(item)

            const item6:ItemProps = { isActive:false, value:config.levelPrice * 2 ** (i-1), count:0,secondCount:0, people:0, reinvest:0, type:2, i:i ,blocked:false,placeArr:[],placeSource:[]};
            if(x6Map &&x6Map.has(i)){
                const x6:X6 | undefined = x6Map.get(i);
                if(x6){

                    const firstCount:number = x6.firstLevelReferrals?x6.firstLevelReferrals.length:0;
                    const secondCount:number = x6.secondLevelReferrals?x6.secondLevelReferrals.length:0;
                    const reinvestCount:number = x6.reinvestCount?x6.reinvestCount:0;
                    const partnersCount:number = x6.partnersCount?x6.partnersCount:0;

                    item6.isActive = true
                    item6.blocked = x6.blocked
                    item6.count = firstCount
                    item6.secondCount = secondCount
                    item6.people = partnersCount
                    item6.reinvest = reinvestCount
                    item6.placeArr = x6.placeArr
                    item6.placeSource = x6.placeSource
                }
            }
            itemX6.push(item6)
        }
        
        return <>
            
            <Layout>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <Spin tip="Pending..." spinning={spinning}>
                        <div className="text-center" style={{height:document.documentElement.clientHeight * 0.43}}>
                            <img src={require("./image/logo.png")} width="30%"/>
                        </div>
                    <div className="Next">

                        <div className="Userbg">
                            <div className="User">{i18n.t("walletAccount")}</div>
                        </div>
                        
                        <div className="text-center  wallet-info">
                            <div  className="all">
                                <Space className="walletI flex">
                                    <Tag color="magenta" ><span className=" all text-large text-bold">{account.Name}({utils.ellipsis(account.MainPKr)})</span></Tag>
                                    {/*<Popover placement="bottomRight" title="Select Account" content={<div>*/}
                                    {/*    <List>*/}
                                    {/*    {accounts && accounts.length>0 && accounts.map((v)=>{*/}
                                    {/*        return <List.Item onClick={()=>{*/}
                                    {/*            this.setAccount(v)*/}
                                    {/*        }}><span className="text-bold">{v.Name} ({utils.ellipsis(v.MainPKr)})</span></List.Item>*/}
                                    {/*    })}*/}
                                    {/*    </List>*/}
                                    {/*</div>} trigger="click">*/}
                                    {/*   */}
                                    {/*</Popover>*/}
                                    <button  className="btn" onClick={()=>{this.showAccountModal()}}>{i18n.t("switch")}</button>
                                </Space>
                            </div>
                            <div className="info-head">
                                <div className="text-center text-bold">
                                  <span className="letter-spacing">{i18n.t("assets")}</span>:&ensp;{value} {config.useCoin}
                                </div>
                                {/* <button className="btns">提现</button> */}
                            </div>
                            {/* <div>
                                <div>我的余额(SERO):</div>
                            </div>
                            <div>
                                <Button className="pay">充值</Button>
                            </div> */}
                            {/*<br/><br/>*/}
                            {/*<Tag color="magenta"><span className="text-small text-bold">{utils.ellipsis(account.MainPKr)}</span></Tag>*/}
                        </div>

                        <div className="Userbg2">
                            <div className="User">{i18n.t("contractAccount")}</div>
                        </div>

                        <div className="card-container">
                            <Tabs onChange={callback} type="card">
                                <TabPane  tab={<span className="text-large text-bold tab-left" >Info</span>} key="1">
                                    <MyInfo info={info} account={account} setRefCode={this.setRefCode} register={this.register} detail={detail} reward={this.reward}/>

                                </TabPane>
                                <TabPane tab={<span className="text-large text-bold">S&ensp;3</span>} key="2">
                                    <div>
                                        <V3 list={itemX3} active={this.active} key={"v3"} isUserExists={isUserExists}/>
                                    </div>
                                </TabPane>
                                <TabPane tab={<span className="text-large text-bold">S&ensp;6</span>} key="3">
                                    <V6 list={itemX6} active={this.active} key="v6" isUserExists={isUserExists}/>

                                </TabPane>
                            </Tabs>
                            <div className="footer">

                                <img className="footers" src={require("./image/footer.png")} alt=""/>
                            </div>
                            <Space direction="vertical">
                                <Row className="static">
                                    <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6} style={{marginBottom:"12px"}}>
                                        <UserOutlined className="active"/> {i18n.t("yourInvite")}
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}  style={{marginBottom:"12px"}}>
                                        <UserOutlined className="overflow-partner"/> {i18n.t("overflow")}
                                    </Col>
                                    {/*<Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6} style={{marginBottom:"12px"}}>*/}
                                    {/*    <UserOutlined className="overflow"/>OVERFLOW FROM UP*/}
                                    {/*</Col>*/}
                                    {/*<Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6} style={{marginBottom:"12px"}}>*/}
                                    {/*    <UserOutlined className="bottom-up"/>PARTNER WHO IS AHEAD OF HIS INVITER*/}
                                    {/*</Col>*/}
                                </Row>
                            </Space>

                        </div>
                    </div>
                    </Spin>

                </Content>
            </Layout>

        </>;
    }
}

export default App;
