import {tw} from "twind";
import {css} from "twind/css";
import Input from "../components/Input.tsx";
import {CartSimple} from "./Cart.tsx";
import IconWechat from "../components/IconWechat.tsx";
import IconAlipay from "../components/IconAlipay.tsx";
import {StateUpdater, useState} from "preact/hooks";
import OptionBox from "../components/OptionBox.tsx";
import {Money} from "../utils/types.ts";
import {formatCurrency} from "../utils/utils.ts";
import {JSX} from "preact";
import {useCart} from "../data/cart.ts";

enum Stage {
    Infomation,
    Shipping,
    Payment,
}

interface ShipMethod {
    method: string;
    price: Money;
}

interface State {
    stage: Stage;
    contact: string;
    firstName: string;
    lastName: string;
    country: string;
    province: string;
    city: string;
    postcode: string;
    address: string;
    phone: string;
    shipMethod: ShipMethod;
    payMethod: string;
}

interface Mutate {
    stage: StateUpdater<Stage>;
    contact: StateUpdater<string>;
    firstName: StateUpdater<string>;
    lastName: StateUpdater<string>;
    country: StateUpdater<string>;
    province: StateUpdater<string>;
    city: StateUpdater<string>;
    postcode: StateUpdater<string>;
    address: StateUpdater<string>;
    phone: StateUpdater<string>;
    shipMethod: StateUpdater<ShipMethod>;
    payMethod: StateUpdater<string>;
}

function HeaderIndictor(props: { mutate: Mutate; state: State }) {
    return (
        <div class="flex flex-col gap-5">
            <p class="text-2xl font-bold">Nintendo Shop</p>
            <div class="flex text-sm font-light justify-start gap-2">
                {(() => {
                    switch (props.state.stage) {
                        case Stage.Infomation:
                            return (
                                <>
                                    <span class="font-normal">Information</span>
                                    <p>&gt;</p>
                                    <span
                                        class="hover:underline cursor-pointer"
                                        onClick={() => {
                                            props.mutate.stage(Stage.Shipping);
                                        }}
                                    >
                    Shipping
                  </span>
                                    <p>&gt;</p>
                                    <span
                                        class="hover:underline cursor-pointer"
                                        onClick={() => {
                                            props.mutate.stage(Stage.Payment);
                                        }}
                                    >
                    Payment
                  </span>
                                </>
                            );
                        case Stage.Shipping:
                            return (
                                <>
                  <span
                      class="hover:underline cursor-pointer"
                      onClick={() => {
                          props.mutate.stage(Stage.Infomation);
                      }}
                  >
                    Information
                  </span>
                                    <p>&gt;</p>
                                    <span class="font-normal">Shipping</span>
                                    <p>&gt;</p>
                                    <span
                                        class="hover:underline cursor-pointer"
                                        onClick={() => {
                                            props.mutate.stage(Stage.Payment);
                                        }}
                                    >
                    Payment
                  </span>
                                </>
                            );
                        case Stage.Payment:
                            return (
                                <>
                  <span
                      class="hover:underline cursor-pointer"
                      onClick={() => {
                          props.mutate.stage(Stage.Infomation);
                      }}
                  >
                    Information
                  </span>
                                    <p>&gt;</p>
                                    <span
                                        class="hover:underline cursor-pointer"
                                        onClick={() => {
                                            props.mutate.stage(Stage.Shipping);
                                        }}
                                    >
                    Shipping
                  </span>
                                    <p>&gt;</p>
                                    <span class="font-normal">Payment</span>
                                </>
                            );
                    }
                })()}
            </div>
        </div>
    );
}

function Infomation(props: { mutate: Mutate; state: State }) {
    return (
        <>
            <HeaderIndictor state={props.state} mutate={props.mutate}/>
            <div class="flex flex-col font-bold text-lg gap-4">
                <p>Contact</p>
                <p class="text-sm font-light">
                    We will send the latest shipment tracking information through this
                    email.
                </p>
                <Input
                    id="input_contact"
                    class="w-full mb-5"
                    placeholder="Email"
                    onChange={(e) => {
                        props.mutate.contact((e.target as HTMLInputElement).value);
                    }}
                    value={props.state.contact}
                />
                <p>Shipping address</p>
                <div class="flex flex-row gap-2">
                    <Input
                        id="input_first_name"
                        class="w-full my-4"
                        placeholder="First name (Optional)"
                        onChange={(e) => {
                            props.mutate.firstName((e.target as HTMLInputElement).value);
                        }}
                        value={props.state.firstName}
                    />
                    <Input
                        id="input_last_name"
                        class="w-full my-4"
                        placeholder="Last name"
                        onChange={(e) => {
                            props.mutate.lastName((e.target as HTMLInputElement).value);
                        }}
                        value={props.state.lastName}
                    />
                </div>
                <Input
                    id="input_country"
                    class="w-full"
                    placeholder="Country/Region"
                    onChange={(e) => {
                        props.mutate.country((e.target as HTMLInputElement).value);
                    }}
                    value={props.state.country}
                />
                <div class="flex flex-row gap-2">
                    <Input
                        id="input_province"
                        class="w-full my-2"
                        placeholder="Province"
                        onChange={(e) => {
                            props.mutate.province((e.target as HTMLInputElement).value);
                        }}
                        value={props.state.province}
                    />
                    <Input
                        id="input_city"
                        class="w-full my-2"
                        placeholder="City"
                        onChange={(e) => {
                            props.mutate.city((e.target as HTMLInputElement).value);
                        }}
                        value={props.state.city}
                    />
                    <Input
                        id="input_postcode"
                        class="w-full my-2"
                        placeholder="Postcode"
                        onChange={(e) => {
                            props.mutate.postcode((e.target as HTMLInputElement).value);
                        }}
                        value={props.state.postcode}
                    />
                </div>
                <div class="flex flex-row gap-2">
                    <Input
                        id="input_address"
                        class="w-2/3 my-2"
                        placeholder="Address"
                        onChange={(e) => {
                            props.mutate.address((e.target as HTMLInputElement).value);
                        }}
                        value={props.state.address}
                    />
                    <Input
                        id="input_phone"
                        class="w-1/3 my-2"
                        placeholder="Phone"
                        onChange={(e) => {
                            props.mutate.phone((e.target as HTMLInputElement).value);
                        }}
                        value={props.state.phone}
                    />
                </div>
            </div>
            <button
                class="mb-5 max-h-16 px-3 py-2 bg-gray-700 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700"
                onClick={() => {
                    props.mutate.stage(Stage.Shipping);
                }}
            >
                Continue to shipping
            </button>
        </>
    );
}

function Shipping(
    props: { mutate: Mutate; state: State; methods: ShipMethod[] },
) {
    return (
        <>
            <HeaderIndictor state={props.state} mutate={props.mutate}/>
            <div class="flex flex-col gap-4">
                <div class="rounded-md border border-2 border-inherit">
                    <div class="flex flex-row justify-between pt-2 pb-1 px-6">
                        <p>Contact</p>
                        <p>{props.state.contact}</p>
                        <span
                            class="text-blue-500 hover:underline cursor-pointer"
                            onClick={() => {
                                props.mutate.stage(Stage.Infomation);
                            }}
                        >
              Change
            </span>
                    </div>
                    <hr class="my-1 mx-6"></hr>
                    <div class="flex flex-row justify-between pt-2 pb-2 px-6">
                        <p>Ship to</p>
                        <p>{`${props.state.address},${props.state.city}`}</p>
                        <span
                            class="text-blue-500 hover:underline cursor-pointer"
                            onClick={() => {
                                props.mutate.stage(Stage.Infomation);
                            }}
                        >
              Change
            </span>
                    </div>
                </div>
                <p class="font-bold text-lg mt-5">Shipping method</p>
                <div class="flex flex-col gap-4">
                    {props.methods.map((v, i) => {
                        return (
                            <OptionBox
                                inner={
                                    <>
                                        <p>{v.method}</p>
                                        <p>{formatCurrency(v.price)}</p>
                                    </>
                                }
                                select={v.method === props.state.shipMethod.method}
                                onClick={() => {
                                    props.mutate.shipMethod(props.methods[i]);
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <button
                class="mb-5 max-h-16 px-3 py-2 bg-gray-700 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700"
                onClick={() => {
                    props.mutate.stage(Stage.Payment);
                }}
            >
                Continue to payment
            </button>
        </>
    );
}

function Payment(props: { mutate: Mutate; state: State; methods: string[] }) {
    const methodMap: Record<string, JSX.Element> = {
        "wechat": (
            <>
                <p>Wechat</p>
                <IconWechat/>
            </>
        ),
        "alipay": (
            <>
                <p>Alipay</p>
                <IconAlipay/>
            </>
        ),
    };
    return (
        <>
            <HeaderIndictor mutate={props.mutate} state={props.state}/>
            <div class="flex flex-col gap-4">
                <div class="rounded-md border border-2 border-inherit">
                    <div class="flex flex-row justify-between pt-2 pb-1 px-6">
                        <p>Contact</p>
                        <p>{props.state.contact}</p>
                        <span
                            class="text-blue-500 hover:underline cursor-pointer"
                            onClick={() => {
                                props.mutate.stage(Stage.Infomation);
                            }}
                        >
              Change
            </span>
                    </div>
                    <hr class="my-1 mx-6"></hr>
                    <div class="flex flex-row justify-between pt-2 pb-1 px-6">
                        <p>Ship to</p>
                        <p>{`${props.state.address},${props.state.city}`}</p>
                        <span
                            class="text-blue-500 hover:underline cursor-pointer"
                            onClick={() => {
                                props.mutate.stage(Stage.Infomation);
                            }}
                        >
              Change
            </span>
                    </div>
                    <hr class="my-1 mx-6"></hr>
                    <div class="flex flex-row justify-between pt-2 pb-2 px-6">
                        <p>Method</p>
                        <p>{props.state.shipMethod.method}</p>
                        <span
                            class="text-blue-500 hover:underline cursor-pointer"
                            onClick={() => {
                                props.mutate.stage(Stage.Shipping);
                            }}
                        >
              Change
            </span>
                    </div>
                </div>
                <p class="font-bold text-lg mt-5">Payment</p>
                <div class="flex flex-col gap-4">
                    {props.methods.map((v, i) => {
                        return (
                            <OptionBox
                                inner={methodMap[v]}
                                select={v === props.state.payMethod}
                                onClick={() => {
                                    props.mutate.payMethod(props.methods[i]);
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <button
                class="mb-5 max-h-16 px-3 py-2 bg-gray-700 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700">
                Pay now
            </button>
        </>
    );
}

function Payload() {
    const [stage, stageMut] = useState(Stage.Infomation);
    const [contact, contactMut] = useState("");
    const [firstName, firstNameMut] = useState("");
    const [lastName, lastNameMut] = useState("");
    const [country, countryMut] = useState("");
    const [province, provinceMut] = useState("");
    const [city, cityMut] = useState("");
    const [postcode, postcodeMut] = useState("");
    const [address, addressMut] = useState("");
    const [phone, phoneMut] = useState("");
    // we will later use gotShipMethod later, not shipMethod beacause using shipMethod will invoke hook.
    const gotShipMethod = {
        method: "China Post",
        price: {
            amount: 15.0,
            currencyCode: "USD",
        },
    };
    const [shipMethod, shipMethodMut] = useState(gotShipMethod);
    const [payMethod, payMethodMut] = useState("");
    const state = {
        stage: stage,
        contact: contact,
        firstName: firstName,
        lastName: lastName,
        country: country,
        province: province,
        city: city,
        postcode: postcode,
        address: address,
        phone: phone,
        shipMethod: shipMethod,
        payMethod: payMethod,
    };
    const mutate = {
        stage: stageMut,
        contact: contactMut,
        firstName: firstNameMut,
        lastName: lastNameMut,
        country: countryMut,
        province: provinceMut,
        city: cityMut,
        postcode: postcodeMut,
        address: addressMut,
        phone: phoneMut,
        shipMethod: shipMethodMut,
        payMethod: payMethodMut,
    };
    return (
        <>
            {(() => {
                switch (stage) {
                    case Stage.Infomation:
                        return <Infomation mutate={mutate} state={state}/>;
                    case Stage.Shipping:
                        return (
                            <Shipping
                                mutate={mutate}
                                state={state}
                                methods={[gotShipMethod, {
                                    method: "American Post",
                                    price: {
                                        amount: 15.0,
                                        currencyCode: "USD",
                                    },
                                }]}
                            />
                        );
                    case Stage.Payment:
                        return (
                            <Payment
                                mutate={mutate}
                                state={state}
                                methods={["wechat", "alipay"]}
                            />
                        );
                }
            })()}
        </>
    );
}

export default function Checkout() {
    const gridCols = css({
        "grid-template-columns": "57% 43%",
    });
    const {data, error} = useCart();
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!data) {
        return <div>No data</div>;
    }
    return (
        <div class={tw`grid ${gridCols}`}>
            <div class="flex flex-row justify-end px-20 pt-16">
                <div class="flex w-2/3 flex-col gap-8">
                    <Payload/>
                </div>
            </div>
            <div class="flex flex-row justify-start px-10 py-16">
                <div class="flex flex-col w-[70%] gap-4">
                    <CartSimple cart={data}/>
                    <div class="overflow-auto bg-white rounded-md px-6 py-4">
                        <div class="flex flex-row justify-between">
                            <p>Subtotal</p>
                            <p>{formatCurrency(data.totalAmount)}</p>
                        </div>
                        <div class="flex flex-row justify-between">
                            <p>Shipping</p>
                            <p>$16</p>
                        </div>
                        <div class="flex flex-row justify-between font-bold text-lg my-1">
                            <p>Total</p>
                            <p>$55</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
