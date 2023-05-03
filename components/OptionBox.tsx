import {JSX} from "preact";

export default function OptionBox(
    {
        inner = <></>, select = false, onClick = () => {
    }
    }: {
        inner: JSX.Element;
        select?: boolean;
        onClick?: () => void;
    },
) {
    return (
        <>
            {(() => {
                if (select) {
                    return (
                        <div
                            class="rounded border border-2 border-black flex flex-row justify-between px-6 py-4"
                            onClick={onClick}
                        >
                            {inner}
                        </div>
                    );
                } else {
                    return (
                        <div
                            class="rounded border border-2 border-inherit flex flex-row justify-between px-6 py-4"
                            onClick={onClick}
                        >
                            {inner}
                        </div>
                    );
                }
            })()}
        </>
    );
}
