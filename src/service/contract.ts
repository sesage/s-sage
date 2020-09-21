import * as config from './config'
import service from "./service";
import BigNumber from "bignumber.js";
import * as utils from "../common/utils";
import {fromValue} from "../common/utils";

const serojs = require("serojs")
const seropp = require("sero-pp")

export interface Params {
    from?: string
    to: string
    cy?: string
    value?: string
    gas?: string
    gasPrice?: string
    data?: string
}

export interface Users {
    id: any
    referrer: string
    partnersCount: any
    x3Income:BigNumber
    x6Income:BigNumber
    activeS3Levels:Array<boolean>
    activeS6Levels:Array<boolean>
    latestShareDay:number
    latestShareAmount:BigNumber
}

export interface Detail {
    lastId:any
    total:BigNumber
    burnOf:BigNumber
    cy:string
}

export interface X3 {
    currentReferrer: string
    referrals: Array<string>
    blocked: boolean
    reinvestCount: any
    partnersCount: any
    isExtraDividends:boolean
    placeArr:Array<any>;
    placeSource:Array<any>;
}

export interface X6 {
    currentReferrer: string
    firstLevelReferrals: Array<string>
    secondLevelReferrals: Array<string>
    blocked: boolean
    closedPart: string
    reinvestCount: any
    partnersCount: any
    isExtraDividends:boolean
    placeArr:Array<any>;
    placeSource:Array<any>;
}

class Contract {

    contract: any;

    constructor() {
        this.contract = serojs.callContract(config.abi, config.address)

    }

    async info(mainPKr:string):Promise<Users>{
        const rest:any = await this.call("info",[],mainPKr)
        return {
            id: rest[0],
            referrer: rest[1],
            partnersCount: rest[2],
            x3Income:fromValue(rest[3],18),
            x6Income:fromValue(rest[4],18),
            activeS3Levels:rest[5],
            activeS6Levels:rest[6],
            latestShareDay: parseInt(rest[7]),
            latestShareAmount:fromValue(rest[8],18)
        }
    }

    async detail(mainPKr:string):Promise<Detail>{
        const rest:any = await this.call("detail",[],mainPKr)
        return {
            lastId: rest[0],
            total: fromValue(rest[1],18),
            burnOf: fromValue(rest[2],18),
            cy:rest[4]
        }
    }

    async idToAddress(userId:number,mainPKr:string):Promise<string>{
        return await this.call("idToAddress",[userId],mainPKr)
    }


    async usersActiveX3Levels(mainPKr:string,level:number):Promise<boolean>{
        const rest:any = await this.call("usersActiveX3Levels",[mainPKr,level],mainPKr)
        return rest[0]
    }

    async isUserExists(mainPKr:string):Promise<boolean>{
        const rest:any= await this.call("isUserExists",[mainPKr],mainPKr)
        return rest[0]
    }

    async usersActiveX6Levels(mainPKr:string,level:number):Promise<boolean>{
        const rest:any = await this.call("usersActiveX6Levels",[mainPKr,level],mainPKr)
        return rest[0]
    }

    async usersX3Matrix(mainPKr:string,level:number):Promise<X3>{
        const rest:any = await this.call("usersX3Matrix",[mainPKr,level],mainPKr)
        return {
            currentReferrer:rest[0],
            referrals:rest[1],
            blocked:rest[2],
            reinvestCount: rest[3],
            partnersCount: rest[4],
            isExtraDividends:rest[5],
            placeArr:rest[6],
            placeSource:rest[7],
        }
    }

    async usersX6Matrix(mainPKr:string,level:number):Promise<X6>{
        const rest:any = await this.call("usersX6Matrix",[mainPKr,level],mainPKr)
        return {
            currentReferrer:rest[0],
            firstLevelReferrals:rest[1],
            secondLevelReferrals:rest[2],
            blocked:rest[3],
            closedPart:rest[4],
            reinvestCount: rest[5],
            partnersCount: rest[6],
            isExtraDividends:rest[7],
            placeArr:rest[8],
            placeSource:rest[9]
        }
    }

    async activeMatrix(account:any,type:number,level:number):Promise<string>{
        const hash:any = await this.execute("buyNewLevel",[type,level],account,config.useCoin,"0x"+utils.toValue(config.levelPrice*2**(level-1),18).toString(16))
        return hash;
    }


    async registrationExt(account:any,code:number):Promise<string>{
        const rest:any = await this.idToAddress(code,account.MainPKr);
        const pkr:any = await utils.convertShotAddress(rest[0])
        const hash:any = await this.execute("registrationExt",[pkr],account,config.useCoin,"0x"+utils.toValue(config.levelPrice*2,18).toString(16))
        return hash;
    }


    async reward(account:any):Promise<string>{
        const hash:any = await this.execute("reward",[],account,config.useCoin,"0x0")
        return hash;
    }

    async call(method: string, args: Array<any>, from: string): Promise<any> {
        const packData: any = this.contract.packData(method, args, true)
        const contract = this.contract;
        return new Promise((resolve, reject) => {
            const params: Params = {
                to: this.contract.address
            }
            params.from = from
            params.data = packData;

            service.rpc("sero_call", [params, "latest"]).then(data => {
                if (data != "0x") {
                    const rest: any = contract.unPackDataEx(method, data)
                    resolve(rest)
                } else {
                    // alert(alertmethod+"---"+data);
                }
            }).catch(err => {
                reject(err)
            })

        })
    }

    async execute(method: string, args: Array<any>, account: any, cy?: string, value?: string): Promise<any> {
        const packData: any = this.contract.packData(method, args, true)

        return new Promise((resolve, reject) => {
            const params: Params = {
                to: this.contract.address
            }
            params.from = account.MainPKr
            params.data = packData;
            if (cy) {
                params.cy = cy;
            }
            if (value) {
                params.value = value;
            }
            service.rpc("sero_estimateGas", [params]).then((data: any) => {
                params.gas = data;
                params.from = account.PK
                seropp.executeContract(params, function (hash: any, err: any) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(hash)
                    }
                })
            }).catch(e => {
                reject(e)
            })
        })
    }
}

const contract = new Contract();

export default contract