import * as React from "react";

interface Props {
    title: string
    , value: number
    , upFunc1(): void
        , dwnFunc1(): void
        , upFunc10(): void
        , dwnFunc10(): void
        , cssClassName: string
}

const Count: React.FunctionComponent<Props> = (props) => {
    return (
        <article className={props.cssClassName}>
            <h2>{props.title}</h2>
            <button onClick={props.dwnFunc1}>&lt;</button>
            <button onClick={props.dwnFunc10}>&lt;&lt;</button>
            <input maxLength={4} value={props.value} />
            <button onClick={props.upFunc1}>&gt;</button>
            <button onClick={props.upFunc10}>&gt;&gt;</button>
        </article>
    )
}

export default Count;