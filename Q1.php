<?php
function getUserArticles($option)
{
    $user_id = $option['user_id'];
    $article_id = $option['article_id'];
    if (!($user_id and $article_id)){return;}//不存在ID跟文章ID就跳出
    $user = User::getUser($user_id);
    if (!($user)){//不存在帳號丟錯並跳出
                        throw new AlertException("查無此帳號!", '/');
                        return;
                 }
    $blog = $user->blog;
    if (!($blog)){//帳號不存在部落格丟錯並跳出
                        throw new AlertException("帳號尚未有部落格!", '/');
                        return;
                 }
    $article = $blog->getArticle($article_id);
    if (!($article)){//帳號不存在該文章丟錯並跳出
                        throw new AlertException("此帳號無此文章!", '/');
                        return;
                    }
    return $article;
}
?>