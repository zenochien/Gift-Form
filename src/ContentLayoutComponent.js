import React, { useEffect, useRef } from "react";
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
import { Box } from "@cloudscape-design/components";

import { get, post } from "aws-amplify/api";

export default function ContentLayoutComponent() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [value, setValue] = React.useState("gift-items");
    const [selectedOption, setSelectedOption] = React.useState({
        label: "",
        value: "",
    });
    const [name, setName] = React.useState("");
    const [phone, setphone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [notes, setNotes] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const [alert, setAlert] = React.useState(null);

    const [inventory, setInventory] = React.useState({
        shirts: 100,
        bags: 100,
        hats: 100
    });

    const [selectedItemName, setSelectedItemName] = React.useState("Áo First Cloud Journey");
    const [selectedImage, setSelectedImage] = React.useState("/images/1.png");
    const [selectedGift, setSelectedGift] = React.useState(null);

    // Create a ref for the form container
    const formRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = {};

        if (!name) {
            newErrors.name = "Bắt buộc Họ và tên";
        }

        const phoneRegex = /^\d{10}$/;
        if (!phone) {
            newErrors.phone = "Bắt buộc số điện thoại";
        } else if (!phoneRegex.test(phone)) {
            newErrors.phone = "Số điện thoại phải chứa đúng 10 chữ số";
        }

        if (!email) {
            newErrors.email = "Bắt buộc email";
        }

        if (!address) {
            newErrors.address = "Bắt buộc địa chỉ";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        } else {
            setIsSubmitting(true);

            //Check email exist or not
            try {
                // Get gửi yêu câu đến /items, với tham số truy vấn queryParams chỉ email cần kiểm tra
                // existingEmail lưu kết quả từ API
                // existingEmail.response trích xuất pha62 {body} của phản hồi từ API
                // json phân tích cú pháp dạng JSON từ phản hồi
                // console.log(json) In ra nội dung JSON từ API
                const existingEmail = get({
                    apiName: "api1c7f3d57",
                    path: "/items",
                    options: {
                        queryParams: {
                            email: email,
                        },
                    },
                });

                const { body } = await existingEmail.response;
                const json = await body.json();
                console.log(json);

                // If email existed
                if (Object.keys(json).length > 0) {
                    setAlert({
                        type: "error",
                        header: "Đăng ký không thành công",
                        content: "Email này đã được đăng ký.",
                    });
                    setIsSubmitting(false);
                    return;
                } else {
                    // if not
                    // Perform the POST request
                    // post gửi yêu cầu đến /items, dữ liệu (payload) chưa thông tin về DB
                    // dataPost chứa kết quả của việc gọi API POST
                    // responsePost trích xuất phản hồi từ kết quả API sau khi y/c thực hiệu success
                    // console.log(responsePost) in ra phản hồi API
                    const dataPost = post({
                        apiName: "api1c7f3d57",
                        path: "/items",
                        options: {
                            method: "POST",
                            body: {
                                name: name,
                                phone: phone,
                                email: email,
                                address: address,
                                notes: notes,
                                size: selectedOption.label,
                                selectedItemName: selectedItemName,
                                selectedImage: selectedImage,
                            },
                        },
                    });

                    const responsePost = await dataPost.response;
                    console.log("POST call succeeded");
                    console.log(responsePost);

                    setName("");
                    setphone("");
                    setEmail("");
                    setNotes("");
                    setAlert({
                        type: "success",
                        header: "Đăng ký thành công",
                        content: `Bạn đã đăng ký thành công với quà tặng: ${selectedItemName}`,
                    });
                }
            } catch (e) {
                console.log("GET call failed: ", e);
            } finally {
                setIsSubmitting(false);
            }

            setErrors({});
        }
    };

    const handleTileChange = async ({ detail }) => {
        const selectedValue = detail.value;
        setValue(selectedValue);

        const existingEmail = get({
            apiName: "api1c7f3d57",
            path: "/inventory",
        });

        const { body } = await existingEmail.response;
        const json = await body.json();
        console.log(json);

        // Check if the selected item is out of stock
        if (
            (selectedValue === "gift-items" && inventory.shirts <= 0) ||
            (selectedValue === "item2" && inventory.bags <= 0) ||
            (selectedValue === "item3" && inventory.hats <= 0)
        ) {
            setAlert({
                type: "error",
                header: "Quà tặng hết hàng",
                content: "Quà tặng này đã hết hàng, vui lòng chọn quà khác.",
            });
            return;
        }

        // Update selected image and item name based on selected tile
        if (selectedValue === "gift-items") {
            setSelectedItemName("Áo First Cloud Journey");
            setSelectedImage("/images/1.png");
        } else if (selectedValue === "item2") {
            setSelectedItemName("Túi First Cloud Journey");
            setSelectedImage("/images/5.png");
        } else if (selectedValue === "item3") {
            setSelectedItemName("Nón First Cloud Journey");
            setSelectedImage("/images/3.png");
        }

        // Scroll to the form when a tile is selected
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };


    return (
        <>
            <ContentLayout
                // defaultPadding
                // headerVariant="high-contrast"
                // maxContentWidth={800}
                header={
                    <div className="header-container">
                        <Header
                            variant="h1"
                            description={
                                <div>
                                    <h1 className="header-title">Cloud Day Vietnam</h1>
                                    <br></br>
                                    <span className="sub-title">Gift 2024</span>
                                </div>

                            }
                        >
                            <div >
                                <div className="header-description">18, September 2024 | <b>JW Marriott Hotel Hanoi</b></div>
                            </div>
                        </Header>

                    </div>
                }
            >
                {/* Content goes here */}
            </ContentLayout>

            <Box className="header-content" variant="h1" padding={{ top: "m" }}>
                Gift from First Cloud Journey
            </Box>
            <div className="content-container">
                <div className="tiles-container">
                    <Tiles
                        onChange={handleTileChange} // Use handleTileChange to trigger scroll
                        className="tile"
                        value={value}
                        ariaRequired
                        items={[
                            {
                                label: "Áo First Cloud Journey",
                                image: (
                                    <img
                                        src="/images/1.png"
                                        alt="Áo First Cloud Journey"
                                        className="tiles-item"
                                    />
                                ),
                                value: "gift-items",
                                disabled: inventory.shirts <= 0 || selectedGift && selectedGift !== "gift-items",
                                description: inventory.shirts <= 0 ? "Hết hàng" : "",
                            },
                            {
                                label: "Túi First Cloud Journey",
                                image: (
                                    <img
                                        src="/images/5.png"
                                        alt="Túi First Cloud Journey"
                                        className="tiles-item"
                                    />
                                ),
                                value: "item2",
                                disabled: inventory.bags <= 0 || selectedGift && selectedGift !== "item2",
                                description: inventory.bags <= 0 ? "Hết hàng" : "",
                            },
                            {
                                label: "Nón First Cloud Journey",
                                image: (
                                    <img
                                        src="/images/3.png"
                                        alt="Nón First Cloud Journey"
                                        className="tiles-item"
                                    />
                                ),
                                value: "item3",
                                disabled: inventory.hats <= 0 || selectedGift && selectedGift !== "item3",
                                description: inventory.hats <= 0 ? "Hết hàng" : "",
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
                                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Đang xử lý..." : "Submit"}
                                    </Button>
                                </SpaceBetween>
                            }
                        >
                            <Container
                                header={<Header variant="h2" description="Form Gifts">Form Thông tin nhận quà</Header>}
                            >
                                <SpaceBetween direction="vertical" size="l">
                                    <FormField label="Họ và tên" description="Please enter your full name" errorText={errors.name}>
                                        <Input
                                            value={name}
                                            onChange={({ detail }) => setName(detail.value)}
                                            required
                                            ariaRequired
                                        />
                                    </FormField>
                                    <FormField label="Số điện thoại" description="Please enter your phone number" errorText={errors.phone}>
                                        <Input
                                            value={phone}
                                            onChange={({ detail }) => setphone(detail.value)}
                                            required
                                            ariaRequired
                                        />
                                    </FormField>
                                    <FormField label="Email" description="Please enter your email address" errorText={errors.email}>
                                        <Input
                                            value={email}
                                            type="email"
                                            onChange={({ detail }) => setEmail(detail.value)}
                                            required
                                            ariaRequired
                                        />
                                    </FormField>
                                    <FormField label="Size áo" description="Please select your preferred T-shirt size">
                                        <Select
                                            selectedOption={selectedOption}
                                            onChange={({ detail }) =>
                                                setSelectedOption(detail.selectedOption)
                                            }
                                            options={[
                                                { label: "Áo S (48kg-54kg)", value: "1" },
                                                { label: "Áo M (55kg-61kg)", value: "2" },
                                                { label: "Áo L (62kg-68kg)", value: "3" },
                                                { label: "Áo XL (69kg-75kg)", value: "4" },
                                                { label: "Áo 2XL (76kg-84kg)", value: "5" },
                                                { label: "Áo 3XL (85kg-90kg)", value: "6" },
                                            ]}
                                            disabled={value !== "gift-items"}
                                        />
                                    </FormField>

                                    <FormField label="Địa chỉ" description="Please enter your home address" errorText={errors.address}>
                                        <Input
                                            value={address}
                                            onChange={({ detail }) => setAddress(detail.value)}
                                            required
                                            ariaRequired
                                        />
                                    </FormField>

                                    <FormField label="Note" description="Any additional thoughts or special requests?">
                                        <Textarea
                                            value={notes}
                                            onChange={({ detail }) => setNotes(detail.value)}
                                            placeholder="Ghi chú"
                                        />
                                    </FormField>

                                    {/* Display selected image and item name */}
                                    <FormField label="Quà tặng đã chọn" description="Selected your gifts">
                                        <Box variant="h3">{selectedItemName}</Box>
                                        <img
                                            src={selectedImage}
                                            alt={selectedItemName}
                                            style={{ maxWidth: "100px" }}
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
