"use strict";

function Legend({ labels }) {
    const labelsArray = labels.map((label, labelIndex) => {
        return (
            <div>
                <span
                    className="Legend--color"
                    style={{ backgroundColor: colors[labelIndex % colors.length] }}
                />
                <span className="Legend--label">{label}</span>
            </div>
        );
    })

    return (
        <div className="Legend">
            {labelsArray}
        </div>
    );
}
