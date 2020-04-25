import styled, {css} from 'styled-components';

type Link = {
    primary: boolean
}
const Wrap = styled.div`
    margin-top: 80px;
    margin-left: 50px
`
const Title = styled.h2`
    color: tomato;
    ${(props: Link) => props.primary && css`
        color: palevioletred;
    `}
`


type Types = {
    isSelected: boolean
    disabled: boolean
}
const Link = styled.a``
const List = styled.div`
    margin-right: 20px;
    width: 350px;
`
const User = styled.div`
    background-color: ${(props: Types) => props.isSelected && 'aqua'};
    padding: 0 0 5px;
    margin-bottom: 2px;
    &[disabled] {
        opacity: .6;
        cursor: not-allowed;
    }
    & a {
        pointer-events: ${(props: Types) => props.disabled && 'none'};
    }
`
const Icon = styled.button`
    float: right;
    background: transparent;
    border-radius: 2em;
    color: #f00;
    display: inline-block;
    font-size: 12px;
    height: 20px;
    line-height: 1px;
    margin: 0;
    padding: 0;
    text-align: center;
    width: 20px;
    :focus { outline: none; }
`
const Main = styled.div`
  display: flex;
`
const Bio = styled.div`
  padding: 0 0 15px;
  width: 500px;
`

export {
    Wrap, Title,
    Link, List, User, Icon,
    Main, Bio
};