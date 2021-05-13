/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { Link, useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    icon: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        flex: '0 0 auto',
        marginRight: 16,
    },
}));

interface IProps{
    chapter: IChapter
}

export default function ChapterCard(props: IProps) {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const { chapter } = props;

    const dateStr = chapter.uploadDate && new Date(chapter.uploadDate).toISOString().slice(0, 10);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <li>
                <Card>
                    <CardContent className={classes.root}>
                        <Link
                            to={`/manga/${chapter.mangaId}/chapter/${chapter.chapterIndex}`}
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.text.primary,
                            }}
                        >
                            <div style={{ display: 'flex' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>

                                    <Typography variant="h5" component="h2">
                                        {chapter.name}
                                        {chapter.chapterNumber > 0 && ` : ${chapter.chapterNumber}`}
                                    </Typography>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        {chapter.scanlator}
                                        {chapter.scanlator && ' '}
                                        {dateStr}
                                    </Typography>
                                </div>
                            </div>
                        </Link>

                        <IconButton aria-label="more" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {/* <MenuItem onClick={handleClose}>Download</MenuItem> */}
                            <MenuItem onClick={handleClose}>Bookmark</MenuItem>
                            <MenuItem onClick={handleClose}>Mark as Read</MenuItem>
                            <MenuItem onClick={handleClose}>Mark previous as Read</MenuItem>
                        </Menu>
                    </CardContent>
                </Card>
            </li>
        </>
    );
}
