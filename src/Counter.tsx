import * as React from 'react';
import Count from './Count';
import moment from 'moment';
import { number, string } from 'prop-types';
import { tsConstructSignatureDeclaration } from '@babel/types';

interface Props { }
interface State {
    year: number
    , month: number
    , day: number
    , age: {
        years: number | null
        , months: number | null
        , days: number | null
        , message: string | null
    }
}
interface TimeSpan {
    day?: number
    , month?: number
    , year?: number
}

export default class Counter extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            year: 1980
            , month: 6
            , day: 1
            , age: {
                years: null
                , months: null
                , days: null
                , message: null
            }
        }
    }

    incYear = (val: number) => {

        let date = this.calDate({ year: val });

        this.setState({
            year: this.state.year + val
        })
    }
    decYear = (val: number) => {
        let date = this.calDate({ year: -val });

        this.setState({
            year: this.state.year - val
        })
    }

    incMonth = (val: number) => {
        this.setState({
            month: this.state.month + val
        })
    }
    decMonth = (val: number) => {
        this.setState({
            month: this.state.month - val
        })
    }

    incDay = (val: number) => {
        this.setState({
            day: this.state.day + val
        })
    }
    decDay = (val: number) => {
        this.setState({
            day: this.state.day - val
        });

        this.calcAge();
    }


    calcAge = (): void => {
        let dob = moment(new Date(`${this.state.year}/${this.state.month}/${this.state.day}`)),
            now = moment(new Date());
        let duration = moment.duration(now.diff(dob));
        console.log(now);
        console.log(dob);
        console.log(duration.years());

        let age = { ...this.state.age };
        age.days = duration.days();
        age.months = duration.months();
        age.years = duration.years();

        age.message = (function (): string | null {

            let retStr: string = "you are";
            if (age.years && age.years > 0) {
                retStr += ` ${age.years} year`
                if (age.years > 1) retStr += "s"
            }
            if (age.months && age.months > 0) {
                retStr += ` ${age.months} month`
                if (age.months > 1) retStr += "s"
            }
            if (age.days) {
                if (retStr == "you are") retStr += " and";
                retStr += ` ${age.days} day`
                if (age.days > 1) retStr += "s"
                retStr += " old";
            }

            return retStr;
        }).call(this)

        this.setState({
            age: age
        });
    }

    calDate = (span: TimeSpan) => {

        let selDate = moment(new Date(`${this.state.year}/${this.state.month}/${this.state.day}`));

        if (span.year) {
            console.log(selDate.date());
            selDate = selDate.add(span.year, "years");
            console.log(selDate.date());
        }

    }

    render() {

        return (

            <section className="dateContainer">
                <Count
                    cssClassName="dateSelector"
                    title="YEAR"
                    upFunc1={() => this.incYear(1)}
                    upFunc10={() => this.incYear(10)}
                    value={this.state.year}
                    dwnFunc1={() => this.decYear(1)}
                    dwnFunc10={() => this.decYear(10)} />

                <Count
                    cssClassName="dateSelector"
                    title="MONTH"
                    upFunc1={() => this.incMonth(1)}
                    upFunc10={() => this.incMonth(10)}
                    value={this.state.month}
                    dwnFunc1={() => this.decMonth(1)}
                    dwnFunc10={() => this.decMonth(10)} />

                <Count
                    cssClassName="dateSelector"
                    title="DAY"
                    upFunc1={() => this.incDay(1)}
                    upFunc10={() => this.incDay(10)}
                    value={this.state.day}
                    dwnFunc1={() => this.decDay(1)}
                    dwnFunc10={() => this.decDay(10)} />

                {<button onClick={this.calcAge}>Calculate</button>}

                <p>{this.state.age.message}</p>

            </section>
        )
    }
}