import { List, ListItem, styled } from "@mui/material";
import StartIcon from '@mui/icons-material/Start';
import GroupAddIcon from '@mui/icons-material/GroupAdd';


const GettingStarted = {
    title: 'Getting Started',
    content: <>
            <li>
                <span>
                    Click the <GroupAddIcon /> located in the top right corner.
                    Enter an AniList username (you can enter &apos;Josh&apos; if you don&apos;t know any), press Enter.
                    You can enter as many usernames as you want.
                </span>
            </li>
            <li>
                <span>
                    Select all lists you want trivia to be generated from.
                </span>
            </li>
            <li>
                <span>
                    On the left, select the number of common users. (Default is 1)
                </span>
            </li>
            <li>
                <span>
                    You can collapse the profiles on the right with the <StartIcon /> icon.
                </span>
            </li>
            <li>
                <span>
                    Click Start to begin!
                </span>
            </li>
    </>
}

export default GettingStarted;