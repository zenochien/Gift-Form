import React, { useRef } from "react";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import Tiles from "@cloudscape-design/components/tiles";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Textarea from "@cloudscape-design/components/textarea";
import Select from "@cloudscape-design/components/select";
import Alert from "@cloudscape-design/components/alert";
// import { API } from "aws-amplify"; // Import API from Amplify
import "./App.css";
import { Box } from "@cloudscape-design/components";

export default function ContentLayoutComponent() {
    const [value, setValue] = React.useState("gift-items");
    const [selectedOption, setSelectedOption] = React.useState({
        label: "Áo S",
        value: "1",
    });
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [notes, setNotes] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const [alert, setAlert] = React.useState(null);
    const [registeredEmails, setRegisteredEmails] = React.useState([]);
    const formRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = {};

        if (!name) {
            newErrors.name = "Bắt buộc Họ và tên";
        }
        if (!phone) {
            newErrors.phone = "Bắt buộc số điện thoại";
        }
        if (!email) {
            newErrors.email = "Bắt buộc email";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            if (registeredEmails.includes(email)) {
                setAlert({
                    type: "error",
                    header: "Đăng ký không thành công",
                    content: "Email này đã được đăng ký.",
                });
            } else {
                try {
                    // Call Amplify API to submit data
                    const response = await API.post("todoApi", "/todo", {
                        body: {
                            name,
                            phone,
                            email,
                            selectedOption: selectedOption.label,
                            notes,
                        },
                    });

                    // Handle success
                    setRegisteredEmails((prev) => [...prev, email]);
                    setName("");
                    setPhone("");
                    setEmail("");
                    setNotes("");
                    setAlert({
                        type: "success",
                        header: "Đăng ký thành công",
                        content: "Đăng ký của bạn đã thành công!",
                    });
                } catch (error) {
                    // Handle error
                    setAlert({
                        type: "error",
                        header: "Đăng ký không thành công",
                        content: `Có lỗi xảy ra: ${error.message}`,
                    });
                }
            }

            setErrors({});
        }
    };

    const handleTileChange = ({ detail }) => {
        setValue(detail.value);

        // Scroll to the form when a tile is selected
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <ContentLayout
                defaultPadding
                headerBackgroundStyle="linear-gradient(135deg, rgb(71, 17, 118) 3%, rgb(131, 57, 157) 44%, rgb(149, 85, 182) 69%, rgb(145, 134, 215) 94%)"
                headerVariant="high-contrast"
                maxContentWidth={800}
                header={<Header variant="h1" description="18, September 2024 | JW Marriott Hotel Hanoi">Cloud Day Vietnam Gift</Header>}
            >
            </ContentLayout>
            <Box className="header-content" variant="h1" padding={{ top: "m" }}>
                Gift from First Cloud Journey
            </Box>
            <div className="content-container">
                <div className="tiles-container">
                    <Tiles
                        onChange={handleTileChange}  // Use handleTileChange to trigger scroll
                        className="tile"
                        value={value}
                        ariaRequired
                        items={[
                            {
                                label: "Áo FCJ",
                                image: (
                                    <img
                                        src="/images/1.png"
                                        alt="bootle"
                                        className="tiles-item"
                                    />
                                ),
                                value: "gift-items",
                            },
                            {
                                label: "Bình nước FCJ",
                                image: (
                                    <img
                                        src="/images/2.png"
                                        alt="box"
                                        className="tiles-item"
                                    />
                                ),
                                value: "item2",
                            },
                            {
                                label: "Nón FCJ",
                                image: (
                                    <img
                                        src="/images/3.png"
                                        alt="shirt"
                                        className="tiles-item"
                                    />
                                ),
                                value: "item3",
                            },
                        ]}
                    />
                </div>

                <div className="form-container" ref={formRef}>
                    {/* Alert for success or error */}
                    {alert && (
                        <Alert
                            className="alert"
                            type={alert.type}
                            header={alert.header}
                            dismissible
                            onDismiss={() => setAlert(null)}
                        >
                            {alert.content}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <Form
                            actions={
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </SpaceBetween>
                            }
                        >
                            <Container
                                header={<Header variant="h2">Form Thông tin nhận quà</Header>}
                            >
                                <SpaceBetween direction="vertical" size="l">
                                    <FormField label="Họ và tên" errorText={errors.name}>
                                        <Input
                                            value={name}
                                            onChange={({ detail }) => setName(detail.value)}
                                            required
                                            ariaRequired
                                        />
                                    </FormField>
                                    <FormField label="Số điện thoại" errorText={errors.phone}>
                                        <Input
                                            value={phone}
                                            onChange={({ detail }) => setPhone(detail.value)}
                                            required
                                            ariaRequired
                                        />
                                    </FormField>
                                    <FormField label="Email" errorText={errors.email}>
                                        <Input
                                            value={email}
                                            type="email"
                                            onChange={({ detail }) => setEmail(detail.value)}
                                            required
                                            ariaRequired
                                        />
                                    </FormField>
                                    <FormField label="Size áo">
                                        <Select
                                            selectedOption={selectedOption}
                                            onChange={({ detail }) =>
                                                setSelectedOption(detail.selectedOption)
                                            }
                                            options={[
                                                { label: "Áo S", value: "1" },
                                                { label: "Áo M", value: "2" },
                                                { label: "Áo L", value: "3" },
                                                { label: "Áo XL", value: "4" },
                                                { label: "Áo 2XL", value: "5" },
                                                { label: "Áo 3XL", value: "6" },
                                            ]}
                                            disabled={value !== "gift-items"}
                                        />
                                    </FormField>

                                    <FormField label="Ghi chú">
                                        <Textarea
                                            value={notes}
                                            onChange={({ detail }) => setNotes(detail.value)}
                                            placeholder="Ghi chú"
                                        />
                                    </FormField>
                                </SpaceBetween>
                            </Container>
                        </Form>
                    </form>
                </div>
            </div>
        </>
    );
}
