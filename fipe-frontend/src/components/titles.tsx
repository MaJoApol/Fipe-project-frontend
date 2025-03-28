


type TitleSize = 'title' | 'label' | 'warn' ;

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement>{
    size?: TitleSize;
}

