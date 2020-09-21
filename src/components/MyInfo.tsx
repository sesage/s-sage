import * as React from "react";
import {fromValue,formatDate} from "../common/utils";
import {Divider,message, Row, Col, Button, Input,Statistic} from 'antd'
import contract, {Detail, Users} from "../service/contract";
import * as config from "../service/config";
import i18n from "../i18n";
import copy from 'copy-text-to-clipboard'
interface Props {
    info:Users
    detail:Detail
    account:any
    setRefCode:(v:any)=>void;
    register:()=>void;
    reward:()=>void;
}
console.log(contract.contract,"contract")
const MyInfo:React.FC<Props> = ({info,account,setRefCode,register,detail,reward})=>{
    
    const {id,referrer,partnersCount,x3Income,x6Income,activeS3Levels,activeS6Levels,latestShareDay,latestShareAmount} = info;
    let value = "0.000";
    if(account && account.Balance){
        value = fromValue(account.Balance.get(config.useCoin),18).toFixed(3,1)
    }

    return <>
        {/* <div className="basis"> */}
            <div className="foin">
            {/* <div className="fill" style={{width:'2.3px'}}></div> */}
            <div className="info">
                {/* <Row style={{marginBottom:"24px"}}>
                    <Col className="text-center text-large text-bold" span={12}>
                        <Statistic title={<span className="text-large text-bold">{i18n.t("totalPartner")}</span>} value={parseInt(detail.lastId)-1} precision={0} />
                    </Col>
                    <Col className="text-center text-large text-bold" span={12}>
                        <Statistic title={<span className="text-large text-bold">{i18n.t("totalBurned")}</span>} value={detail.burnOf.toNumber()} precision={2} />
                    </Col>
                </Row> 
                <Divider/> */}

                {/* <div className="info-head flex">
                    <div className="text-center text-large text-bold">{i18n.t("assets")} {value} {config.useCoin}</div>
                    <button className="btns">提现</button>
                </div> */}


                <div className="Assets">
                    <Row className="Row flex">
                        <Col className="text-center text-large text-bold" span={8}>{i18n.t("totalIncome")}</Col>
                        <Col className="text-center text-large text-bold" span={16}>{x3Income.plus(x6Income).toFixed(3,1)} {config.useCoin}</Col>
                    </Row>
                    <Divider/>
                    <Row className="Row flex">
                        <Col className="Income text-center text-large text-bold" span={8}> <img style={{marginTop:'2px'}}  width="20%" src={require('../image/S.png')} alt=""/>&nbsp;3</Col>
                        <Col className="text-center text-large text-bold" span={16}>{x3Income.toFixed(3,1)} {config.useCoin}</Col>
                    </Row>
                    <Row className="Row flex">
                        <Col className="Income text-center text-large text-bold" span={8}><img style={{marginTop:'2px'}} width="20%" src={require('../image/S.png')} alt=""/>&nbsp;6</Col>
                        <Col className="text-center text-large text-bold" span={16}>{x6Income.toFixed(3,1)} {config.useCoin}</Col>
                    </Row>
                    {/* <Row style={{marginBottom:"24px"}}>
                        <Col className="text-center text-large text-bold" span={10}>{i18n.t("myInvite")}</Col>
                        <Col className="text-center text-large text-bold" span={14}>{partnersCount}</Col>
                    </Row> */}
                </div>
                <Divider/>
                <div className="Assets">
                    <Row className="Row flex">
                        <Col className="text-center text-large text-bold" span={8}>奖池</Col>
                        <Col className="text-center text-large text-bold" span={16}>{x3Income.plus(x6Income).toFixed(3,1)} {config.useCoin}</Col>
                    </Row>
                    <Divider/>
                    <Row className="Row flex">
                        <Col className="Income text-center" span={8}>奖池日期</Col>
                        <Col className="text-center text-large text-bold" span={16}>{formatDate(latestShareDay*1000)}</Col>
                    </Row>
                    <Row className="Row flex">
                        <Col className="Income text-center" span={8}>奖池大小</Col>
                        <Col className="text-center text-large text-bold" span={16}>{latestShareAmount.toFixed(3,1)} {config.useCoin}</Col>
                    </Row>
                    <Row style={{marginBottom:"24px"}}>
                        <Button onClick={()=>reward()} block={true} type="primary">提现</Button>
                    </Row>
                </div>
                <Divider/>
                <div className="my-link text-center">
                    <div className="InviteUrl">
                        {/* <div className="text-center text-large text-bold">输入推荐码:</div> */}
                        <div>
                            {
                                id == 0 ? <div className="Input">
                                    <Input size="small" type="number" placeholder={i18n.t("inputCode")} onChange={(v:any)=>{
                                        setRefCode(v.target.value!!)
                                    }}/>
                                    <br/>
                                    <br/>
                                    <Button size="small" onClick={()=>register()} block type="primary">{i18n.t("register")}</Button>
                                </div>:<div>
                                    {i18n.t("referCode")}<br/>
                                    <div style={{display:"flex",justifyContent:"center"}} >
                                    <span>{id}</span>
                                    <span><img width="50%" src={require("../image/Copy.png")} onClick={()=>{
                                            copy(id)
                                            message.success(i18n.t("copySuccess"))
                                         }} alt=""/> </span>
                                </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <Divider/>
                {/* <div className="text-center text-large jackpot">
                    <div>奖池:100000&ensp;SERO</div>
                    <div>符合条件的人数:&ensp;100个</div>
                    <div>我的最高级别:&ensp; V9</div>
                    <div>我能平分的数量:&ensp; 0.1SERO</div>
                    <Button size="small" type="primary">提现</Button>
                </div> */}
                <Divider/>
                <div className="address text-center text-large">
                     <div>{i18n.t("contractAddress")} &ensp;<img onClick={()=>{
                            copy(contract.contract.address)
                            message.success(i18n.t("copySuccess"))
                        }} src={require("../image/Copy.png")} width="12px"  alt=""/>
                    </div>
                    <div className="break text-large" onClick={()=>{
                            copy(contract.contract.address)
                            message.success(i18n.t("copySuccess"))
                    }}>{contract.contract.address}</div> 
                </div>
            </div>
            </div>
        {/* </div> */}
    </>
}

export default MyInfo