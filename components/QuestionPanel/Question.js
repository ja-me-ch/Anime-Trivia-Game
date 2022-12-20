import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Default from './QuestionTemplates/Default';
import Images from './QuestionTemplates/Images';

const RootStyle = styled('div')((props) => ({
    // border: '1px solid lime',
    width: '100%',
    minWidth: '1000px',
    height: 'auto',
}));

function Question({props}) {
    const { template } = props;
    console.log('TEMPLATE: ', template);

    const getTemplate = function (template) {
        if (template === undefined || template === 'Default') {
            return <Default props={props} />
        }
        else if (template === 'Images') {
            return <Images props={props} />
        }
    }

    return (
        <RootStyle>
            {getTemplate(template)}
        </RootStyle>
    )
}

export default Question;
