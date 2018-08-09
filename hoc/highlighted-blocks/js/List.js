'use strict';

const List = props => {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return (
                    <VideoDecorated {...item} />
                );

            case 'article':
                return (
                    <ArticleDecorated {...item} />
                );
        }
    });
};
