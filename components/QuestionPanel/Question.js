import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Default from './QuestionTemplates/Default';
import Images from './QuestionTemplates/Images';

const RootStyle = styled('div')((props) => ({
    // border: '1px solid lime',
    width: '100%',
    // minWidth: '1000px',
    // height: 'auto',
    // flex: '1'
}));

function Question({props}) {
    // const name  = props.template.name
    // console.log('TEMPLATE: ', template);

    

    return (
        <RootStyle>
            {getTemplate(props)}
        </RootStyle>
    )
}

const getTemplate = function (props) {
    if (props.template === undefined) return <Default props={props} />
    else if (props.template.name === 'Images') return <Images props={props} />
    else if (props.template.name === 'Default') return <Default props={props} />
}

export default Question;
