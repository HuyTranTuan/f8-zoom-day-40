import PropTypes from "prop-types"
import clsx from "clsx";

import style from "./Button.module.scss";

function Button({
    children, rounded = false, primary = false, success = false, warning = false, danger = false, sm = false, md = false, lg = false, href, className, ...passProps
}) {
    const classNames = clsx(style.wrapper, className, {
        [style.rounded]: rounded,
        [style.primary]: primary,
        [style.success]: success,
        [style.warning]: warning,
        [style.danger]: danger,
        [style.sm]: sm,
        [style.md]: md,
        [style.lg]: lg,
    })
    const Component = href ? "a" : "button"
    return (
        <>
            <Component
                {...passProps}
                className={clsx(classNames)}
                href={href}
            >
                {children}
            </Component>
        </>
    )
}

Button.prototype = {
    children: PropTypes.node.isRequired,
    rounded: PropTypes.bool,
    primary: PropTypes.bool,
    success: PropTypes.bool,
    warning: PropTypes.bool,
    danger: PropTypes.bool,
    sm: PropTypes.bool,
    md: PropTypes.bool,
    lg: PropTypes.bool,
    href: PropTypes.string
}

export default Button