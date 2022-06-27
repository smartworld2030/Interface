/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface ISmartInvest05Interface extends ethers.utils.Interface {
  functions: {
    "BNBPrice()": FunctionFragment;
    "BNBtoUSD(uint256)": FunctionFragment;
    "BNBtoUSDWithFee(uint256)": FunctionFragment;
    "USDtoBNB(uint256)": FunctionFragment;
    "calculateHourly(address,uint256)": FunctionFragment;
    "calculateInterest(address)": FunctionFragment;
    "hourlyReward(uint256)": FunctionFragment;
    "invest(address)": FunctionFragment;
    "monthlyReward(uint256)": FunctionFragment;
    "refMultiplier(address,uint8)": FunctionFragment;
    "userDepositDetails(address,uint256)": FunctionFragment;
    "userDepositNumber(address)": FunctionFragment;
    "userList(uint256)": FunctionFragment;
    "userListLength()": FunctionFragment;
    "users(address)": FunctionFragment;
    "withdrawInterest()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "BNBPrice", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "BNBtoUSD",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "BNBtoUSDWithFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "USDtoBNB",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateHourly",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateInterest",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "hourlyReward",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "invest", values: [string]): string;
  encodeFunctionData(
    functionFragment: "monthlyReward",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "refMultiplier",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "userDepositDetails",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "userDepositNumber",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "userList",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "userListLength",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "users", values: [string]): string;
  encodeFunctionData(
    functionFragment: "withdrawInterest",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "BNBPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "BNBtoUSD", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "BNBtoUSDWithFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "USDtoBNB", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calculateHourly",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateInterest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hourlyReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "invest", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "monthlyReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "refMultiplier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userDepositDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userDepositNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "userList", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "userListLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "users", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawInterest",
    data: BytesLike
  ): Result;

  events: {
    "RegisterUser(address,address,uint256)": EventFragment;
    "UpdateUser(address,uint256)": EventFragment;
    "WithdrawInterest(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RegisterUser"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateUser"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawInterest"): EventFragment;
}

export class ISmartInvest05 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ISmartInvest05Interface;

  functions: {
    BNBPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    "BNBPrice()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    BNBtoUSD(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "BNBtoUSD(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    BNBtoUSDWithFee(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "BNBtoUSDWithFee(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    USDtoBNB(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "USDtoBNB(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    calculateHourly(
      sender: string,
      time: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { current: BigNumber; past: BigNumber }
    >;

    "calculateHourly(address,uint256)"(
      sender: string,
      time: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { current: BigNumber; past: BigNumber }
    >;

    calculateInterest(
      user: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        hourly: BigNumber;
        referral: BigNumber;
        requestTime: BigNumber;
      }
    >;

    "calculateInterest(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        hourly: BigNumber;
        referral: BigNumber;
        requestTime: BigNumber;
      }
    >;

    hourlyReward(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "hourlyReward(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    invest(
      referrer: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "invest(address)"(
      referrer: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    monthlyReward(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "monthlyReward(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    refMultiplier(
      user: string,
      level: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "refMultiplier(address,uint8)"(
      user: string,
      level: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    userDepositDetails(
      user: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        amount: BigNumber;
        reward: BigNumber;
        startTime: BigNumber;
        endTime: BigNumber;
      }
    >;

    "userDepositDetails(address,uint256)"(
      user: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        amount: BigNumber;
        reward: BigNumber;
        startTime: BigNumber;
        endTime: BigNumber;
      }
    >;

    userDepositNumber(
      user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "userDepositNumber(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    userList(index: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    "userList(uint256)"(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    userListLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    "userListLength()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    users(
      user: string,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, BigNumber] & {
        referrer: string;
        refAmounts: BigNumber;
        totalAmount: BigNumber;
        latestWithdraw: BigNumber;
      }
    >;

    "users(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, BigNumber] & {
        referrer: string;
        refAmounts: BigNumber;
        totalAmount: BigNumber;
        latestWithdraw: BigNumber;
      }
    >;

    withdrawInterest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "withdrawInterest()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  BNBPrice(overrides?: CallOverrides): Promise<BigNumber>;

  "BNBPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

  BNBtoUSD(value: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  "BNBtoUSD(uint256)"(
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  BNBtoUSDWithFee(
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "BNBtoUSDWithFee(uint256)"(
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  USDtoBNB(value: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  "USDtoBNB(uint256)"(
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calculateHourly(
    sender: string,
    time: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { current: BigNumber; past: BigNumber }>;

  "calculateHourly(address,uint256)"(
    sender: string,
    time: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { current: BigNumber; past: BigNumber }>;

  calculateInterest(
    user: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      hourly: BigNumber;
      referral: BigNumber;
      requestTime: BigNumber;
    }
  >;

  "calculateInterest(address)"(
    user: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      hourly: BigNumber;
      referral: BigNumber;
      requestTime: BigNumber;
    }
  >;

  hourlyReward(
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "hourlyReward(uint256)"(
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  invest(
    referrer: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "invest(address)"(
    referrer: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  monthlyReward(
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "monthlyReward(uint256)"(
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  refMultiplier(
    user: string,
    level: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "refMultiplier(address,uint8)"(
    user: string,
    level: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  userDepositDetails(
    user: string,
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      amount: BigNumber;
      reward: BigNumber;
      startTime: BigNumber;
      endTime: BigNumber;
    }
  >;

  "userDepositDetails(address,uint256)"(
    user: string,
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      amount: BigNumber;
      reward: BigNumber;
      startTime: BigNumber;
      endTime: BigNumber;
    }
  >;

  userDepositNumber(
    user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "userDepositNumber(address)"(
    user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  userList(index: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "userList(uint256)"(
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  userListLength(overrides?: CallOverrides): Promise<BigNumber>;

  "userListLength()"(overrides?: CallOverrides): Promise<BigNumber>;

  users(
    user: string,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, BigNumber, BigNumber] & {
      referrer: string;
      refAmounts: BigNumber;
      totalAmount: BigNumber;
      latestWithdraw: BigNumber;
    }
  >;

  "users(address)"(
    user: string,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, BigNumber, BigNumber] & {
      referrer: string;
      refAmounts: BigNumber;
      totalAmount: BigNumber;
      latestWithdraw: BigNumber;
    }
  >;

  withdrawInterest(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "withdrawInterest()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    BNBPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "BNBPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    BNBtoUSD(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "BNBtoUSD(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    BNBtoUSDWithFee(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "BNBtoUSDWithFee(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    USDtoBNB(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "USDtoBNB(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateHourly(
      sender: string,
      time: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { current: BigNumber; past: BigNumber }
    >;

    "calculateHourly(address,uint256)"(
      sender: string,
      time: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { current: BigNumber; past: BigNumber }
    >;

    calculateInterest(
      user: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        hourly: BigNumber;
        referral: BigNumber;
        requestTime: BigNumber;
      }
    >;

    "calculateInterest(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        hourly: BigNumber;
        referral: BigNumber;
        requestTime: BigNumber;
      }
    >;

    hourlyReward(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "hourlyReward(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    invest(referrer: string, overrides?: CallOverrides): Promise<boolean>;

    "invest(address)"(
      referrer: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    monthlyReward(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "monthlyReward(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    refMultiplier(
      user: string,
      level: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "refMultiplier(address,uint8)"(
      user: string,
      level: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userDepositDetails(
      user: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        amount: BigNumber;
        reward: BigNumber;
        startTime: BigNumber;
        endTime: BigNumber;
      }
    >;

    "userDepositDetails(address,uint256)"(
      user: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        amount: BigNumber;
        reward: BigNumber;
        startTime: BigNumber;
        endTime: BigNumber;
      }
    >;

    userDepositNumber(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "userDepositNumber(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userList(index: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "userList(uint256)"(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    userListLength(overrides?: CallOverrides): Promise<BigNumber>;

    "userListLength()"(overrides?: CallOverrides): Promise<BigNumber>;

    users(
      user: string,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, BigNumber] & {
        referrer: string;
        refAmounts: BigNumber;
        totalAmount: BigNumber;
        latestWithdraw: BigNumber;
      }
    >;

    "users(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, BigNumber] & {
        referrer: string;
        refAmounts: BigNumber;
        totalAmount: BigNumber;
        latestWithdraw: BigNumber;
      }
    >;

    withdrawInterest(overrides?: CallOverrides): Promise<boolean>;

    "withdrawInterest()"(overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {
    RegisterUser(
      user: string | null,
      referrer: string | null,
      value: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { user: string; referrer: string; value: BigNumber }
    >;

    UpdateUser(
      user: string | null,
      value: null
    ): TypedEventFilter<
      [string, BigNumber],
      { user: string; value: BigNumber }
    >;

    WithdrawInterest(
      user: string | null,
      hourly: null,
      referrals: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { user: string; hourly: BigNumber; referrals: BigNumber }
    >;
  };

  estimateGas: {
    BNBPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "BNBPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    BNBtoUSD(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "BNBtoUSD(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    BNBtoUSDWithFee(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "BNBtoUSDWithFee(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    USDtoBNB(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "USDtoBNB(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateHourly(
      sender: string,
      time: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calculateHourly(address,uint256)"(
      sender: string,
      time: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateInterest(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calculateInterest(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hourlyReward(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "hourlyReward(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    invest(
      referrer: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "invest(address)"(
      referrer: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    monthlyReward(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "monthlyReward(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    refMultiplier(
      user: string,
      level: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "refMultiplier(address,uint8)"(
      user: string,
      level: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userDepositDetails(
      user: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "userDepositDetails(address,uint256)"(
      user: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userDepositNumber(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "userDepositNumber(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userList(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "userList(uint256)"(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userListLength(overrides?: CallOverrides): Promise<BigNumber>;

    "userListLength()"(overrides?: CallOverrides): Promise<BigNumber>;

    users(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    "users(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawInterest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "withdrawInterest()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    BNBPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "BNBPrice()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    BNBtoUSD(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "BNBtoUSD(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    BNBtoUSDWithFee(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "BNBtoUSDWithFee(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    USDtoBNB(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "USDtoBNB(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateHourly(
      sender: string,
      time: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "calculateHourly(address,uint256)"(
      sender: string,
      time: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateInterest(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "calculateInterest(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hourlyReward(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "hourlyReward(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    invest(
      referrer: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "invest(address)"(
      referrer: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    monthlyReward(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "monthlyReward(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    refMultiplier(
      user: string,
      level: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "refMultiplier(address,uint8)"(
      user: string,
      level: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userDepositDetails(
      user: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "userDepositDetails(address,uint256)"(
      user: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userDepositNumber(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "userDepositNumber(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userList(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "userList(uint256)"(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userListLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "userListLength()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    users(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "users(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawInterest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "withdrawInterest()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}